import React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { OrderType } from '../../types/order';

interface INewOrderProps {
    createNewOrder: () => Promise<void>,
    newOrderType: OrderType,
    setNewOrderType: React.Dispatch<React.SetStateAction<OrderType>>,
    newOrderCustomerName: string,
    setNewOrderCustomerName: React.Dispatch<React.SetStateAction<string>>,
    newOrderCreatedByUserName: string,
    setNewOrderCreatedByUserName: React.Dispatch<React.SetStateAction<string>>
    orderTypes: OrderType[];
}

export function NewOrder(props: INewOrderProps): JSX.Element {
    const {
        createNewOrder,
        newOrderType,
        setNewOrderType,
        newOrderCustomerName,
        setNewOrderCustomerName,
        newOrderCreatedByUserName,
        setNewOrderCreatedByUserName,
        orderTypes,
    } = props;
    const canCreateNewOrder = newOrderType !== OrderType.NotSet && newOrderCustomerName.length > 0 && newOrderCreatedByUserName.length > 0;
    const handleSelectOrderTypeChange = (event: SelectChangeEvent) => {
        setNewOrderType(OrderType[event.target.value as keyof typeof OrderType]);
    };
    return <Stack>
        <InputLabel id="selectNewOrderTypeLabel">Order Type</InputLabel>
        <Select
            labelId="selectNewOrderTypeLabel"
            id="selectNewOrderType"
            value={newOrderType}
            label="Order Type"
            onChange={handleSelectOrderTypeChange}
        >
            {orderTypes.map(orderType => {
                return <MenuItem key={orderType} value={orderType}>{orderType}</MenuItem>
            })}
        </Select>
        <TextField
            id="newCustomerOrderName"
            label="Customer Name"
            variant="outlined"
            value={newOrderCustomerName}
            onChange={e => setNewOrderCustomerName(e.currentTarget.value)}
        />
        <TextField
            id="newOrderCreatedByUserName"
            label="Created By User Name"
            variant="outlined"
            value={newOrderCreatedByUserName}
            onChange={e => setNewOrderCreatedByUserName(e.currentTarget.value)} 
        />
        <Button onClick={createNewOrder} disabled={!canCreateNewOrder}>Create New Order</Button>
    </Stack>
}