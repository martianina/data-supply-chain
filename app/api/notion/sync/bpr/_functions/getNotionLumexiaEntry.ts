"use server"

import notion from "@/lib/notion";
import prisma from "@/lib/prisma"
import { handleSync } from "./handleSync";

export const getNotionGingerScienceEntry = async (bprId: string) => {

    const entry = await prisma.notionBpr.findFirstOrThrow({
        where: {
            gingerscienceBprId: bprId,
        }
    });

    const { notionPageId } = entry;

    const xx = await handleSync(bprId, notionPageId);
    return xx
}
