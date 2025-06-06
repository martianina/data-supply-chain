import PageTitle from '@/components/Text/PageTitle'
import React from 'react'
import StatusTag from './StatusTag'
import ActionButtons from './ActionButtons'
import { PurchaseOrderDetails } from '../../_functions/getPurchaseOrder'
import { PurchaseOrderStatus } from '@/types/purchaseOrderStatus'
import { FlattenedOrderItem } from '../../_functions/flattenOrderItems'
import { Config } from '@prisma/client'

type HeaderProps = {
    purchaseOrder: PurchaseOrderDetails,
    orderItems: FlattenedOrderItem[],
    poStatuses: PurchaseOrderStatus[]
    company: Config[]
}

const Header = ({ purchaseOrder, orderItems, poStatuses, company }: HeaderProps) => {
    return (
        <div>
            <span className="flex flex-row justify-between">
                <div className="flex flex-row items-center justify-start gap-x-4 mt-4 mb-4">
                    <PageTitle title={`PO #${purchaseOrder.referenceCode} - ${purchaseOrder.supplier.name}`} />

                    <StatusTag purchaseOrder={purchaseOrder} />
                </div>


                <ActionButtons
                    purchaseOrder={purchaseOrder}
                    orderItems={orderItems}
                    poStatuses={poStatuses}
                    company={company}
                />
            </span>
        </div>
    )
}

export default Header
