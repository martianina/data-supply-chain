"use client";

import DataTable from "@/components/DataTable";
import { FlattenedPurchaseOrder } from "../_functions/flattenPurchaseOrders";
import { purchaseOrderColumns } from "../_configs/purchaseOrderColumns";
import { toFacetFilter } from "@/utils/data/toFacetFilter";
import { Filter } from "@/types/filter";
import { useRouter } from "next/navigation";
import Motions from "@/components/Motions";
import { RowSelectionHandlerMethod, rowSelectionHandler } from "@/utils/auxiliary/rowSelectionHandler";

const PurchaseOrderTable = ({
  purchaseOrders,
}: {
  purchaseOrders: FlattenedPurchaseOrder[];
}) => {
  const router = useRouter();
  const handleRowClick = (row: any, method: RowSelectionHandlerMethod) => {
    const path =  `/purchasing/purchase-orders/${row.original.referenceCode}?id=${row.original.id}`
    rowSelectionHandler(method,path, router)
  };

  const filters: Filter[] = [
    {
      columnName: "supplierName",
      filterLabel: "Supplier",
      options: toFacetFilter(purchaseOrders, "supplierName", "supplierName"),
    },
    {
      columnName: "statusName",
      filterLabel: "Status",
      options: toFacetFilter(purchaseOrders, "statusName", "statusName"),
    },
  ];

  return (
    <div>
      <Motions.NewDialog dialogIdentifier="createPurchaseOrder" />
      <DataTable.Default
        data={purchaseOrders}
        columns={purchaseOrderColumns}
        dialogIdentifier="createPurchaseOrder"
        filters={filters}
        onRowClick={(row, method) => handleRowClick(row, method)}
        actionButtonTitle="New Purchase Order"
        tableStateName="pos"
      />
    </div>
  );
};

export default PurchaseOrderTable;
