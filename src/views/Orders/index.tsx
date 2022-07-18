import React, { useEffect, useState } from "react";
import Page from "../../components/Page";
import DropdownSelect from "../../components/DropdownSelect";
import { OrderAPI } from '../../api/apicontainer';
import type { Order } from "../../types/order";
import type { SelectOption } from "../../components/DropdownSelect";
import { OrderType } from "../../types/order";
import { NewOrder } from "./newOrder";
import { OrderList } from "./orderList";
import TextField from "@material-ui/core/TextField";

export default function Orders() {
    const [orderData, setOrderData] = useState<Order[]>([]);
    const orderTypes = [
        OrderType.NotSet,
        OrderType.PurchaseOrder,
        OrderType.ReturnOrder,
        OrderType.SaleOrder,
        OrderType.TransferOrder
    ]
    const [customerFilterOptions, setCustomerFilterOptions] = useState<SelectOption[]>([])
    const [selectedCustomerFilter, setSelectedCustomerFilter] = useState<SelectOption>();
    const [orderIdFilter, setOrderIdFilter] = useState<number | undefined>();
    const fetchData = React.useCallback(async () => {

        var orderResponse = await OrderAPI.Get();
        if (typeof (orderResponse) === 'number') {
            console.log("error fetching data");
        } else {
            setOrderData([...orderResponse]);
            
            setCustomerFilterOptions([...getUniqueCustomersForFilter(orderResponse.map(order => order.customerName))]);
        }

    }, []);

    useEffect(() => {
        fetchData()
    }, [fetchData]);

    function getUniqueCustomersForFilter(customerList: string[]): SelectOption[] {
        const uniqueCustomers: string[] = [];
        customerList.forEach(customer => {
            if (!uniqueCustomers.includes(customer)) {
                uniqueCustomers.push(customer);
            }
        });
        return customersToSelectOptions(uniqueCustomers.sort((a, b) => a < b ? -1 : 1));
    }

    function customersToSelectOptions(customers: string[]): SelectOption[] {
        return customers.map(customer => { return { label: customer, value: customer } });
    }

    // accept only numbers for ID field (source: https://thewebdev.info/2021/12/26/how-to-accept-only-positive-unsigned-integer-values-in-textfield-with-react-material-ui/)
    function handleOrderIdFilterChange(event: React.ChangeEvent<HTMLInputElement>): void {
        if (event.target.value === "")
            setOrderIdFilter(undefined)
        else {
            const value: number = +event.target.value;
            if (value < 0)
                setOrderIdFilter(0)
            else
                setOrderIdFilter(+value.toFixed())
        }
      
    }

    const [newOrderType, setNewOrderType] = useState<OrderType>(OrderType.NotSet);
    const [newOrderCustomerName, setNewOrderCustomerName] = useState("");
    const [newOrderCreatedByUserName, setNewOrderCreatedByUserName] = useState("");
    function resetNewOrderFields() {
        setNewOrderType(OrderType.NotSet)
        setNewOrderCustomerName("");
        setNewOrderCreatedByUserName("");
    }

    async function createNewOrder(): Promise<void> {
        const newOrder: Order = {
            orderId: 0,
            orderType: newOrderType,
            customerName: newOrderCustomerName,
            createdDate: new Date().toDateString(),
            createdByUserName: newOrderCreatedByUserName
        }
        var createdNewOrder = await OrderAPI.Create(newOrder)

        if (typeof (createdNewOrder) === 'number') {
            console.error("error fetching data");
        } else {
            let newOrderData = [...orderData, createdNewOrder];
            setOrderData(newOrderData);
            setCustomerFilterOptions([...getUniqueCustomersForFilter(newOrderData.map(order => order.customerName))]);
            resetNewOrderFields();
        }
    }

    const newOrderProps = {
        createNewOrder,
        newOrderType,
        setNewOrderType,
        newOrderCustomerName,
        setNewOrderCustomerName,
        newOrderCreatedByUserName,
        setNewOrderCreatedByUserName,
        orderTypes,
    }

    const orderListProps = {
        orders: orderData,
        selectedCustomerFilter,
        orderIdFilter
    }

    return <Page headerTitle={"Orders"}>
        <NewOrder {...newOrderProps} />
        <hr />
        <DropdownSelect
            options={customerFilterOptions}
            value={selectedCustomerFilter}
            placeholder="Filter by Customer"
            onSelectOption={setSelectedCustomerFilter}
        />
        <TextField
            type="number"
            id="orderIdFilter"
            label="Filter by Order ID"
            variant="outlined"
            value={orderIdFilter || ""}
            onChange={handleOrderIdFilterChange}
        />
        <OrderList {...orderListProps} />
    </Page>
}
