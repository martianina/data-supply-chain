import React from 'react'

type Props = {
    children: React.ReactNode
}
const DataCard = ({ children }: Props) => {
    return (
        <div className='bg-lilac-100 p-4 rounded-xl items-center justify-center text-center'>
            <div className='flex flex-col gap-y-2'>
                {children}
            </div>
        </div >
    )
}

export default DataCard
