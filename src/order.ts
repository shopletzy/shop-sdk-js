import { ShopletzyClient } from "./index";
import { Cart, CartUpdateReq, Category, CheckoutCart, MakePaymentReq, Order, PaymentFailureReq, PaymentSuccessReq, Product, Promotion } from "./types/index";

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

    async getPromotions(orderId: string) {
        const d = await this.client.fetch(`/${this.client.storeName}/v1/orders/${orderId}/promotions`)
        return (await d.json()).promotions as Promotion[]
    }

    async applyPromotion(orderId: string, promoCode: string) {
        const d = await this.client.fetch(`/${this.client.storeName}/v1/orders/${orderId}/applyPromotion`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                promoCode
            })
        })
        return await d.json()
    }

    async removePromotion(orderId: string) {
        const d = await this.client.fetch(`/${this.client.storeName}/v1/orders/${orderId}/removePromotion`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return await d.json()
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

    async paymentFailure(orderId: string, paymentFailureReq: PaymentFailureReq) {
        const r = await this.client.fetch(`/${this.client.storeName}/v1/orders/${orderId}/paymentFailure`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentFailureReq)
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