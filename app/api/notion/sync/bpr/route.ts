"use server"
import { NextResponse } from 'next/server';
import { getBprs } from './_functions/getBprs';
import { getNotionGingerScienceEntry } from './_functions/getNotionGingerScienceEntry';

export async function GET() {

    const bprs = await getBprs();
    return NextResponse.json(bprs);
}

export async function POST(request: Request) {
    
    const body = await request.json()

    const notionGingerScienceEntry = await getNotionGingerScienceEntry(body.id);




    return NextResponse.json(notionGingerScienceEntry);
}
