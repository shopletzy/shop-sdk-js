import { ShopletzyClient } from "./index";
import { Cart, CartUpdateReq, Category, CheckoutCart, Product } from "./types/index";

export class CartResource {
    client: ShopletzyClient;
    constructor(client: ShopletzyClient) {
        this.client = client
    }

    async getCart() {
        const d = await this.client.fetch(`/${this.client.storeName}/v1/carts`)
        return (await d.json()).cart as Cart
    }

    async addToCart(cartId: string, cartUpdateReq: CartUpdateReq) {
        const d = await this.client.fetch(`/${this.client.storeName}/v1/carts/${cartId}/addProduct`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cartUpdateReq)
        })
        return (await d.json()).cart as Cart
    }

    async removeFromCart(cartId: string, cartUpdateReq: CartUpdateReq) {
        const d = await this.client.fetch(`/${this.client.storeName}/v1/carts/${cartId}/removeProduct`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cartUpdateReq)
        })
        return (await d.json()).cart as Cart
    }

    async getDeliverySlots(addressId: string, ouId: string, tz: string) {
        const d = await this.client.fetch(`/${this.client.storeName}/v1/deliverySlots?addressId=${addressId}&ouId=${ouId}&tz=${tz}`)
        return await d.json()
    }

    async checkout(cartId: string, checkoutCart: CheckoutCart) {
        const d = await this.client.fetch(`/${this.client.storeName}/v1/carts/${cartId}/checkout`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(checkoutCart)
        })
        return await d.json()
    }
}