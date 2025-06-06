import Card from "@/components/Card";
import { PoFlatItems } from "../_functions/flattenItems";
import { PoFlattenedOrderItems } from "../_functions/flattenOrderItems";
import { PurchaseOrderDetails } from "../_functions/getPurchaseOrder";
import CardTitle from "@/app/purchasing/suppliers/[name]/_components/supplierInfo/CardTitle";
import PoItemCard from "./PoItemCard";

type PlanningViewProps = {
    orderItems: PoFlattenedOrderItems;
    items: PoFlatItems;
    purchaseOrder: PurchaseOrderDetails;
}
const PlanningView = ({ purchaseOrder, items, orderItems }: PlanningViewProps) => {
    return (
        <Card.Root>
            <Card.Title>Items</Card.Title>

            <div className="grid grid-cols-3 gap-4">
            {orderItems.map((item) => <PoItemCard key={item.id} poItem={item} />)}
                
            </div>
        </Card.Root>
    )
}

export default PlanningView
