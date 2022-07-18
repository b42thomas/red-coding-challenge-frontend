import type { Order } from '../types/order';

export class Orders {
    readonly _apiUrl: string = "";
    readonly _apiKey: string = "";

    constructor(apiUrl?: string, apiKey?: string) {
        if(apiUrl)
            this._apiUrl = apiUrl;
        if(apiKey)
            this._apiKey = apiKey
    }

    async Get(): Promise<Order[] | number> {
        console.log(process.env);
        console.log(this._apiUrl);
        console.log(this._apiKey);
        const options = { 
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ApiKey: this._apiKey
            }
        }
        let response = await fetch(this._apiUrl, options);
        if (response.ok) {
            return await response.json();
        } else {
            return response.status;
        }
    }

    async Create(order: Order):Promise<Order | number> {
        const options = {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Content-Type': 'application/json',
                'ApiKey': this._apiKey
            }
        }
        let response = await fetch(this._apiUrl, options)
        if (response.ok) {
            return await response.json();
        } else {
            return response.status;
        }
    }
}