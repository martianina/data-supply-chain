"use server"

import prisma from "@/lib/prisma"

export const getAllUom = async () => {
    const uom = await prisma.unitOfMeasurement.findMany()

    return uom;
}

export type Uom = Awaited<ReturnType<typeof getAllUom>>[number];
