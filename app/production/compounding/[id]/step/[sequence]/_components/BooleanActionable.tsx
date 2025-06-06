import { revalidatePage } from '@/actions/app/revalidatePage'
import bprStepActionableCompletionActions from '@/actions/production/bprStepActionableCompletions'
import bprStepActionableActions from '@/actions/production/bprStepActionables'
import { getUserId } from '@/actions/users/getUserId'
import ActionButton from '@/components/ActionButton'
import { staticRecords } from '@/configs/staticRecords'
import { ExBprStepActionable } from '@/types/bprStepActionable'
import { createActivityLog } from '@/utils/auxiliary/createActivityLog'
import { BprBatchStep } from '@prisma/client'
import React from 'react'

const BooleanActionable = ({ bprStepActionable, bprId }: { bprStepActionable: ExBprStepActionable, bprId: string }) => {

    const handleClick = async () => {

        const userId = await getUserId()

        const payload = {
            completedByUserId: userId,
            bprStepActionableId: bprStepActionable.id,
            value: 'true',
        };

        await bprStepActionableCompletionActions.createNew(payload)

       let statusId = staticRecords.production.bprStepActionableStatuses.completed
       if (bprStepActionable.stepActionable.verificationRequired) {
           statusId = staticRecords.production.bprStepActionableStatuses.verify;
       }
        


        await bprStepActionableActions.update({ id: bprStepActionable.id }, {
            isCompounded: true,
            statusId,  
        })

        createActivityLog("completeBprActionable", "bpr", bprId, { context: 'Completed BPR batch step actionable.', bprStepActionableId: bprStepActionable.id, })

        revalidatePage("/production/compounding/[id]/step/[sequence]")
    }

    return (
        <div>
            <ActionButton onClick={() => handleClick()} >Done</ActionButton>
        </div>
    )
}

export default BooleanActionable
