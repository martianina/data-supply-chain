"use client";

import Dialog from "@/components/Dialog";
import { Supplier } from "@/types/supplier";
import { useEffect, useState } from "react";
import { createPurchaseOrder } from "../_functions/createPurchaseOrder";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";

type NewPurchaseOrderFormProps = {
    suppliers: Supplier[];
};

const NewPurchaseOrderForm = ({ suppliers }: NewPurchaseOrderFormProps) => {
    const [searchInput, setSearchInput] = useState("");
    const [results, setResults] = useState<any[]>([]);

    const session = useSession();
    const router = useRouter();

    const searchOptions = {
        keys: ['name']
    }

    const searcher = new Fuse(suppliers, searchOptions);

    const handleSubmit = async (supplier: Supplier) => {
        const po = await createPurchaseOrder(supplier, session);

        router.push(`/purchasing/purchase-orders/${po.referenceCode}?id=${po.id}`)

    };

    const handleKeydown = (event: any) => {
        if (event.key === "Enter") {
            const firstResult = results[0];
            handleSubmit(firstResult);
        }
    };

    useEffect(() => {
        const searchResults = searcher.search(searchInput);

        const mappedResults = searchResults.map((s) => s.item);
        setResults(mappedResults);
    }, [searchInput]);

    return (
        <div>
            <Dialog.Title>Select Supplier</Dialog.Title>

            <input
                placeholder="Search Name"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleKeydown}
                className="w-full bg-slate-200 py-2 px-4 rounded-lg text-poppins text-lg mb-6"
            />

            <ul>
                <div className="flex flex-col gap-y-4 max-h-60 overflow-auto">
                    {results.map((supplier) => (
                        <li
                            className="border-2 rounded-lg px-4 py-2"
                            key={supplier.id}
                            onClick={() => handleSubmit(supplier)}
                        >
                            <p>{`${supplier.name}`}</p>
                        </li>
                    ))}
                </div>
            </ul>
        </div>
    );
};

export default NewPurchaseOrderForm;
