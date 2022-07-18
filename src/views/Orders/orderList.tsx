import Stack from '@mui/material/Stack';
import { SelectOption } from '../../components/DropdownSelect';
import type { Order } from '../../types/order';

interface IOrderListProps {
    orders: Order[],
    selectedCustomerFilter: SelectOption | undefined,
    orderIdFilter: number | undefined,
}
export function OrderList(props: IOrderListProps): JSX.Element { 
    const {
        orders,
        selectedCustomerFilter,
        orderIdFilter
    } = props;
    function filterBySelectedCustomer (order: Order): boolean {
        return selectedCustomerFilter === undefined || order.customerName === selectedCustomerFilter.value
    }
    function filterByOrderId(order: Order): boolean {
        return orderIdFilter === undefined || order.orderId === orderIdFilter
    }
     let renderOrders = orders
        .filter(order => filterBySelectedCustomer(order) && filterByOrderId(order))
        .map(order => {
            return <li key={order.orderId}>
                Order Id: {`${order.orderId}`}
                <ul>
                    <li key="customerName">Customer Name: {order.customerName}</li>
                    <li key="orderType">Order Type: {order.orderType}</li>
                    <li key="createdDate">Created Date: {order.createdDate}</li>
                    <li key="createdBy">Created By: {order.createdByUserName}</li>
                </ul>
            </li>
    })
    return <Stack>{orders && renderOrders}</Stack>
}