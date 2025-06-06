'use server'

import { staticRecords } from "@/configs/staticRecords"
import prisma from "@/lib/prisma"

export const getPurchasedItems = async () => {

    const items = await prisma.item.findMany({
        where: {
            procurementTypeId: staticRecords.inventory.procurementTypes.purchased,
        },
        include: {
            aliases: true
        }
    });

    const itemsExtended = items.map((item) => {
        const aliases = item.aliases.map((alias) => alias.name);
        const name = aliases.length === 0 ? item.name : (aliases.length > 3 ? `${item.name} (Numerous Alises)` : `${item.name} (${aliases.join(",")})`) 
        
        return {
            ...item,
            name,
            aliases,
        }
    })

    return itemsExtended 

}

export type PurchasedItem = Awaited<ReturnType<typeof getPurchasedItems>>[number]
