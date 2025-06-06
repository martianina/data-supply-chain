import mbprActions from '@/actions/production/mbprActions'
import { staticRecords } from '@/configs/staticRecords'
import { MasterBatchProductionRecord } from '@/types/masterBatchProductionRecord'
import React, { useEffect, useState } from 'react'
import { useWizard } from 'react-use-wizard'

const MbprStep = ({ selectedItemId, onMbprSelection }: { selectedItemId: string | null, onMbprSelection: (mbpr: MasterBatchProductionRecord) => void }) => {
  const [mbprs, setMbprs] = useState<MasterBatchProductionRecord[]>([])
  const { nextStep } = useWizard()

  const handleMbprSelection = (mbpr: MasterBatchProductionRecord) => {
    onMbprSelection(mbpr)
    nextStep()
  }
  useEffect(() => {
    const getMbprs = async () => {
      if (!selectedItemId) {
        return;
      }
      const data = await mbprActions.getAll({ producesItemId: selectedItemId, recordStatusId: staticRecords.app.recordStatuses.active });

      setMbprs(data)
    }

    getMbprs();
  }, [selectedItemId])
  return (
    <div className='grid grid-cols-2 gap-4'>
      {mbprs.map(m => <div key={m.id} className='flex flex-col bg-swirl-100 rounded-lg p-4 font-poppins font-semibold text-swirl-900' onClick={() => handleMbprSelection(m)}>{m.versionLabel}</div>)}
    </div>
  )
}


export default MbprStep
