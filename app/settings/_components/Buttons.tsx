'use client'

import { useRouter } from "next/navigation"

const Buttons = () => {

    const router = useRouter()

    return (
        <div className="grid grid-cols-3 gap-6">

            <button className="btn h-40" onClick={() => router.push('settings/uom')}>UOM</button>
        </div>
    )
}

export default Buttons
