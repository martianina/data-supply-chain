import supplierActions from "@/actions/purchasing/supplierActions";
import PageTitle from "@/components/Text/PageTitle";
import React from "react";
import Table from "./_components/Table";
import CreateSupplierForm from "./_components/CreateSupplierForm";

const SuppliersPage = async () => {
  const suppliers = await supplierActions.getAll();

  return (
    <div className="flex flex-col gap-y-6">
      <PageTitle title="Suppliers" />

      <CreateSupplierForm />

      <Table suppliers={suppliers} />
    </div>
  );
};

export default SuppliersPage;
