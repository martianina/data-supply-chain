import { AuditRequestNote } from '@/actions/inventory/getOneAuditRequest'
import { DateTime } from 'luxon'
import React from 'react'
import { TbGhost2 } from 'react-icons/tb'

const Notes = ({notes} : {notes: AuditRequestNote[] }) => {
    return (
        <div className='grid grid-cols-1 gap-4 max-h-72 overflow-y-auto'>
            {notes.map((note) => {
                return (
                    <div key={note.id} className='flex flex-col gap-y-4 bg-lilac-100 p-6 rounded-xl'>

                        <div className='flex flex-row justify-start gap-x-4 items-center'>

                            <div className='bg-lilac-300 flex items-center gap-x-2 rounded-xl px-4 py-2'>

                                <span className='text-xl'><TbGhost2 /></span>
                                <h3 className='font-poppins text-base font-medium'>{note.user.name}</h3>
                            </div>

                            <div
                                style={{ backgroundColor: note.noteType.bgColor, color: note.noteType.textColor }}
                                className={`font-poppins font-medium text-sm rounded-xl py-2 px-4 `}
                            >
                                <h3 className='font-poppins font-medium text-sm'>{note.noteType.name}</h3>
                            </div>

                            <div className='font-poppins text-base font-medium'>
                                {DateTime.fromJSDate(note.createdAt).toFormat('DDDD @ t')}
                            </div>

                        </div>


                        <div className='font-poppins text-lg'>
                            {note.content}
                        </div>


                    </div>
                )
            })}
        </div>

    )
}

export default Notes
