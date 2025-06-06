"use server"

import prisma from "@/lib/prisma"

export const getBprStatuses = async () => {
    const statuses = await prisma.bprStatus.findMany();

    return statuses
}

export type BprStatus = Awaited<ReturnType<typeof getBprStatuses>>[number]
