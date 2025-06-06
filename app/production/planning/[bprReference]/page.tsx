import React from 'react'
import { getBpr } from './_functions/getBpr';
import { getBprBom } from './_functions/getBprBom';
import { getInventory } from './_functions/getInventory';
import Title from './_components/Title';
import SchedulingPanel from './_components/SchedulingPanel';
import Layout from '@/components/Layout';
import BasicsPanel from './_components/BasicsPanel';
import MaterialSufficiency from './_components/MaterialSufficiency';
import ActionsPanel from './_components/ActionsPanel';
import ChangeStatusDialog from './_components/ChangeStatusDialog';
import { getBprStatuses } from './_functions/getBprStatuses';
import { getPurchasingRequests } from './_functions/getPurchasingRequests';
import { staticRecords } from '@/configs/staticRecords';

type PlanningBprPage = {
    searchParams: {
        id: string;
    };
}

const PlanningBprPage = async ({ searchParams }: PlanningBprPage) => {

    const { id } = searchParams;
    const bpr = await getBpr(id)
    const statuses = await getBprStatuses();

    if (!bpr) { return null }
    const bom = await getBprBom(bpr.id)

    if (!bom) { return null }
    const inventory = await getInventory(bom as any)

    const sortedMaterialInventory = inventory.sort((a, b) => {
        return parseInt(a.bom.identifier, 10) - parseInt(b.bom.identifier, 10);
    });


    return (
        <div className='flex flex-col gap-y-6'>
            <ChangeStatusDialog statuses={statuses} bprId={bpr.id} />

            <Title bpr={bpr as any} />

            <ActionsPanel bpr={bpr as any} />

            <Layout.Grid cols={2} >

                <BasicsPanel bpr={bpr as any} />
                <SchedulingPanel bprId={bpr.id} start={bpr.scheduledForStart} end={bpr.scheduledForEnd} />

            </Layout.Grid>

            {bpr.status.id === staticRecords.production.bprStatuses.draft && (
                <MaterialSufficiency materials={sortedMaterialInventory as any} />
            )}

        </div>
    )
}

export default PlanningBprPage 
