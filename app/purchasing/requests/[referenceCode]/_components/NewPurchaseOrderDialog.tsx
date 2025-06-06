"use client"
import Dialog from "@/components/Dialog"
import { RequestSupplier } from "../_functions/getSuppliers"
import { LinkablePo } from "../_functions/getLinkablePos"
import { useEffect, useRef, useState } from "react"
import { TbSearch } from "react-icons/tb"
import { createNewPO } from "../_functions/createNewPO"
import useDialog from "@/hooks/useDialog"
import Fuse from "fuse.js"

type NewPurchaseOrderDialogProps = {
    suppliers: RequestSupplier[]
    requestId: string
    itemId: string
    linkablePOs: LinkablePo[]
}

const NewPurchaseOrderDialog = ({ suppliers, requestId, itemId, linkablePOs }: NewPurchaseOrderDialogProps) => {

    const { resetDialogContext } = useDialog()
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
    const [searchInput, setSearchInput] = useState("");
    const [queryResults, setQueryResults] = useState<RequestSupplier[]>([])

    const searchOptions = {
        keys: [
            'name'
        ]
    }

    const searcher = new Fuse(suppliers, searchOptions)

    const uniqueSuggestedSuppliers = linkablePOs
        .map((po) => po.purchaseOrders.supplier) // Extract the supplier object
        .filter((value, index, self) =>
            index === self.findIndex((t) => t.id === value.id) // Ensure uniqueness by supplier id
        );


    const handleSubmit = async (supplierId: string) => {
        await createNewPO(supplierId, itemId, requestId);
        resetDialogContext()

    }



    useEffect(() => {
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        debounceTimeout.current = setTimeout(() => {
            const searchResults = searcher.search(searchInput );
            const mappedResults = searchResults.map((s) => s.item);
            setQueryResults(mappedResults);
        }, 500);

        return () => {
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
            }
        };
    }, [searchInput]);



    return (
        <Dialog.Root identifier="newPOFromRequest">
            <Dialog.Title>Add a New Purchase Order</Dialog.Title>

            <div className="flex flex-col gap-y-8 h-[400px]">
                <div className="flex flex-col gap-y-4">
                    <span className="text-xl font-poppins text-neutral-600">Suggested</span>
                    <div className="grid grid-cols-4 gap-2">
                        {uniqueSuggestedSuppliers.map((supplier) => {
                            return (
                                <div
                                    onClick={() => handleSubmit(supplier.id)}
                                    key={supplier.id}
                                    className="rounded-xl bg-lilac-200 py-2 px-4 text-lg font-medium  text-lilac-900 font-poppins hover:cursor-pointer hover:bg-lilac-300">
                                    {supplier.name}
                                </div>
                            )
                        })}
                    </div>
                </div>


                <div className="flex flex-col gap-y-4">
                    <span className="text-xl font-poppins text-neutral-600">Search</span>

                    <label className="input input-bordered flex items-center gap-2">
                        <input type="text" className="grow" placeholder="Name of supplier" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                        <span className="text-2xl"><TbSearch /></span>
                    </label>



                    <ul className="flex flex-col gap-y-2 max-h-40 overflow-y-auto">

                        {queryResults.length < 10 && queryResults.map((result) => {
                            return (
                                <li key={result.id} className="font-poppins text-lg  bg-lilac-200 rounded-xl py-2 px-4 hover:cursor-pointer hover:bg-lilac-300" onClick={() => handleSubmit(result.id)}>
                                    <span>{result.name}</span>
                                </li>

                            )
                        })}

                        {queryResults.length > 10 && <p className="font-poppins text-lg ">Try refining your search.</p>}
                    </ul>

                </div>


            </div>

        </Dialog.Root>
    )
}

export default NewPurchaseOrderDialog
