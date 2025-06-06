"use server"

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const updateBatchSize = async (id: string, data: Prisma.BatchSizeUncheckedUpdateInput) => {
    const response = await prisma.batchSize.update({
        where: {
            id
        },
        data,
        include: {
            uom: true,
            batchSizeCompoundingVessels: {
                include: {
                    compoundingVessel: {
                        include: {
                            equipment: true
                        }
                    }

                }
            }
        }
    })

    return response;
}

