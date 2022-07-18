export type Order = {
    orderId: number,
    orderType: OrderType,
    customerName: string,
    createdDate: string,
    createdByUserName: string,
}

export enum OrderType {
    NotSet = "NotSet",
    Standard = "Standard",
    SaleOrder = "SaleOrder",
    PurchaseOrder = "PurchaseOrder",
    TransferOrder = "TransferOrder",
    ReturnOrder = "ReturnOrder"
}