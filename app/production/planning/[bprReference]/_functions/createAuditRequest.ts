'use server'
import { getUserId } from "@/actions/users/getUserId"
import { InterimAuditRequestNote } from "../_components/AuditRequest"
import prisma from "@/lib/prisma"
import { staticRecords } from "@/configs/staticRecords"
import { createActivityLog } from "@/utils/auxiliary/createActivityLog"
import { revalidatePath } from "next/cache"

export const createAuditRequest = async (notes: InterimAuditRequestNote[], itemId: string) => {

    const userId = await getUserId()
    // create the request
    const auditRequest = await prisma.auditRequest.create({
        data: {
            requestById: userId,
            statusId: staticRecords.inventory.auditRequests.statuses.open,
            itemId,
        },
        include: {
            item: true
        }
    })

    // create the notes
    await Promise.all(notes.map(async (note) => {
        const response = await prisma.auditRequestNote.create({
            data: {
                requestId: auditRequest.id,
                userId,
                noteTypeId: note.requestNoteTypeId,
                content: note.content
            }
        })

        return response
    }))



    // log the creation

    await createActivityLog('addAuditRequest', 'auditRequest', auditRequest.id, {context: `Audit Request added for ${auditRequest.item.name}`} )
    revalidatePath('/')

    return auditRequest;
}
