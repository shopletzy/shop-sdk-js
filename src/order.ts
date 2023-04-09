import { ShopletzyClient } from "./index";
import { Cart, CartUpdateReq, Category, CheckoutCart, MakePaymentReq, Order, PaymentSuccessReq, Product } from "./types/index";

export class OrderResource {
    client: ShopletzyClient;
    constructor(client: ShopletzyClient) {
        this.client = client
    }

    async getOrders() {
        const d = await this.client.fetch(`/${this.client.storeName}/v1/orders`)
        return (await d.json()).orders as Order[]
    }

    async getOrderById(orderId: string) {
        const d = await this.client.fetch(`/${this.client.storeName}/v1/orders/${orderId}`)
        return (await d.json()) as Order
    }

    async makePayment(orderId: string, makePaymentReq: MakePaymentReq) {
        const r = await this.client.fetch(`/${this.client.storeName}/v1/orders/${orderId}/makePayment`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(makePaymentReq)
        })

        if (!r.ok) throw await r.json();

        return await r.json() as {
            rzrOrderId: string;
            status: string;
        }
    }

    async paymentSuccess(orderId: string, paymentSuccessReq: PaymentSuccessReq) {
        const r = await this.client.fetch(`/${this.client.storeName}/v1/orders/${orderId}/paymentSuccess`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentSuccessReq)
        })
        return await r.json() as {
            rzrOrderId: string;
            status: string;
            orderId: string;
        }
    }

    async paymentFailure(orderId: string) {
        const r = await this.client.fetch(`/${this.client.storeName}/v1/orders/${orderId}/paymentFailure`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return await r.json() as {
            status: string;
        }
    }

    async cancelOrder(orderId: string) {
        const r = await this.client.fetch(`/${this.client.storeName}/v1/orders/${orderId}/cancel`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return await r.json() as {
            status: string;
        }
    }
}