import { DateTime } from 'luxon'
import React from 'react'
import { BatchSize } from '@/types/batchSize'

const SizeCard = ({ size }: { size: BatchSize }) => {

    return (
        <>
            <div className={`flex flex-col items-center bg-white  border-2 border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700`} >
                <div className="flex flex-col justify-between p-4 leading-normal w-full">
                    <div className='flex flex-row items-center justify-between'>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{size.quantity}</h5>
                    </div>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{size.recordStatus?.name}</p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{DateTime.fromJSDate(size.createdAt).toFormat("DD @t")}</p>
                </div>
            </div>
        </>
    )
}

export default SizeCard

