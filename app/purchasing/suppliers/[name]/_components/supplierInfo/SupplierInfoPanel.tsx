import Card from "@/components/Card";
import Text from "@/components/Text";
import { SupplierNote } from "@/types/SupplierNote";
import { Supplier } from "@/types/supplier";
import React from "react";
import NotesTable from "../notes/NotesTable";
import CardTitle from "./CardTitle";

const SupplierInfoPanel = ({
  supplier,
  notes,
}: {
  supplier: Supplier;
  notes: SupplierNote[];
}) => {
  return (
    <Card.Root>
      <div className="flex flex-col gap-y-8">
        <CardTitle supplier={supplier} />


        <div className="flex flex-col gap-y-4">
          <Text.LabelDataPair label="Name" data={supplier.name} />
        </div>
        <div>
          <NotesTable data={notes} supplier={supplier} />
        </div>
      </div>
    </Card.Root>
  );
};

export default SupplierInfoPanel;
