import { ShopletzyClient } from "./index";
import { Cart, CartUpdateReq, Category, Product } from "./types/index";

export class CartResource {
    client: ShopletzyClient;
    constructor(client: ShopletzyClient) {
        this.client = client
    }

    async getCart() {
        const d = await this.client.fetch(`/${this.client.storeName}/v1/carts`)
        return await d.json() as Cart
    }

    async addToCart(cartId: string, cartUpdateReq: CartUpdateReq) {
        const d = await this.client.fetch(`/${this.client.storeName}/v1/carts/${cartId}/addProduct`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cartUpdateReq)
        })
        return await d.json() as Cart
    }

    async removeFromCart(cartId: string, cartUpdateReq: CartUpdateReq) {
        const d = await this.client.fetch(`/${this.client.storeName}/v1/carts/${cartId}/removeProduct`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cartUpdateReq)
        })
        return await d.json() as Cart
    }
}