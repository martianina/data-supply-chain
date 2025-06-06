import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import AuditRequestForm from './AuditRequestForm'
import { AuditRequestNoteType, getAuditRequestNoteTypes } from '../_functions/getAuditRequestNoteTypes'
import { createAuditRequest } from '../_functions/createAuditRequest'
import useToast from '@/hooks/useToast'
import useDialog from '@/hooks/useDialog'

type AuditRequestProps = {
    setMode?: Dispatch<SetStateAction<"default" | "request" | "audit">>
    itemId: string
}

export type InterimAuditRequestNote = {
    requestNoteTypeId: string
    requestNoteType: {
        bgColor: string
        textColor: string
    }
    content: string
}

const AuditRequest = ({ setMode, itemId }: AuditRequestProps) => {

    const [reqMode, setReqMode] = useState<'view' | 'add'>('view')
    const [notes, setNotes] = useState<InterimAuditRequestNote[]>([])
    const [auditRequestNoteTypes, setAuditRequestNoteTypes] = useState<AuditRequestNoteType[]>([])
    const [reval, setReval] = useState<string>('')
    const { toast } = useToast()
    const { resetDialogContext } = useDialog()

    const handleCompleteAuditRequest = async () => {
        await createAuditRequest(notes, itemId);

        if (setMode) {
            setMode('default')
        }
        if (!setMode) {
            resetDialogContext()
        }
        toast('Audit Request Created', 'Production staff with be alerted to conduct an inventory request.', 'success')

    }

    useEffect(() => {
        const getter = async () => {
            const types = await getAuditRequestNoteTypes();

            setAuditRequestNoteTypes(types)
        }

        getter()
    }, [reqMode, reval],)

    return (
        <div className='flex flex-col gap-y-6'>

            {reqMode === 'add' && (<AuditRequestForm setReqMode={setReqMode} setNotes={setNotes} setReval={setReval} types={auditRequestNoteTypes} />)}

            {reqMode === 'view' && (<div className='flex flex-col gap-y-6'>
                <div className='flex'>
                    <button className='btn' onClick={() => setReqMode('add')} >Add Note</button>
                </div>
                <h1 className='font-poppins text-xl text-neutral-700'>Notes</h1>

                <ul className='flex flex-col gap-y-4 '>
                    {notes.map((n) => {
                        const uuid = Math.random()
                        return (
                            <li
                                key={uuid}
                                className='font-poppins flex items-center justify-start text-xl gap-x-2 bg-lilac-300 rounded-xl px-2 py-2'
                            >
                                {n.content}
                            </li>
                        )
                    })}
                </ul>
            </div>
            )
            }

            {reqMode === 'view' && (
                <div className='flex gap-x-2 justify-end'>
                    <button className='btn btn-warning' onClick={() => setMode && setMode('default')}>Cancel</button>

                    <button className='btn btn-success' onClick={() => handleCompleteAuditRequest()}>Submit</button>
                </div>
            )}



        </div>
    )
}

export default AuditRequest
