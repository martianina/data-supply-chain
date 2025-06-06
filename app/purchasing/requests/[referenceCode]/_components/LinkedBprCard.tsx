import React from 'react'
import { LinkedBatchEntryType } from '../_functions/getLinkedBatches'
import { useRouter } from 'next/navigation'
import { TbTrash } from 'react-icons/tb'
import { deleteLinkedBpr } from '../_functions/deleteLinkedBpr'

const LinkedBprCard = ({ bpr }: { bpr: LinkedBatchEntryType }) => {

    const router = useRouter()

    const handleDelete = async (e: any) => {
        e.stopPropagation();
        await deleteLinkedBpr(bpr.id, bpr.requestId)


    }

    const handleClick = () => {
        router.push(`/production/planning/${bpr.bpr.referenceCode}?id=${bpr.bpr.id}`)

    }

    return (
        <div className='card bg-indigo-200 hover:cursor-pointer hover:bg-indigo-300' onClick={handleClick}>
            <div className='card-body'>
                <div className='flex justify-between'>
                    <div className='card-title'>BPR# {bpr.bpr.referenceCode} - {bpr.bpr.mbpr.producesItem.name} </div>
                    <span className='text-2xl hover:text-red-500' onClick={(e) => handleDelete(e)}><TbTrash /></span>
                </div>
            </div>
        </div>
    )
}

export default LinkedBprCard
