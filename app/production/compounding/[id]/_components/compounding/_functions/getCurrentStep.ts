"use server"

import { staticRecords } from "@/configs/staticRecords";
import { ExBprBatchStep } from "@/types/bprBatchStep"

// the current step is defined as
// the first bprBatchStep that 
//          status is fulfillStep 
//          at least one required associated bprStepActionables isCompounded = false


export const getCurrentStep = async (batchSteps: ExBprBatchStep[]) => {

    return batchSteps.find(step =>
        step.statusId === staticRecords.production.bprBatchStepStatuses.fulfillStep &&
        step.bprStepActionables.some(actionable => !actionable.isCompounded)
    );


}

