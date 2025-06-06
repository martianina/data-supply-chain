import Card from '@/components/Card'
import { staticRecords } from '@/configs/staticRecords'
import { ExBprBom } from '@/types/bprBom'
import React from 'react'
import ItemCard from './ItemCard'
import Confetti from '@/components/Confetti/Confetti'

const NotStartedPanel = ({ bom }: { bom: ExBprBom[] }) => {
  
  const notStartedBomItems = bom.filter((bomItem) => bomItem.statusId === staticRecords.production.bprBomStatuses.notStarted);
  
  return (
    <Card.Root>
      <Card.Title>Not Started</Card.Title>
      {notStartedBomItems.length === 0 && <Confetti />}

      <div className='grid grid-cols-4 gap-4'>
        {notStartedBomItems.map((item) => <ItemCard key={item.id} bomItem={item} />)}

      </div>

    </Card.Root>
  )
}

export default NotStartedPanel
