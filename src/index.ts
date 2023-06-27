import { CustomerResource } from "./customer";
import { CartResource } from "./cart";
import { ProductResource } from "./produtct";
import { StoreResource } from "./store"
import { ClientConfig, SiteConfiguration } from "./types/index"
import { OrderResource } from "./order";

export class ShopletzyClient {

    storeName?: string;
    authToken?: string;
    sessionId?: string;
    siteConfig: SiteConfiguration
    config: ClientConfig
    store: StoreResource
    cart: CartResource
    order: OrderResource
    product: ProductResource
    customer: CustomerResource

    constructor(config: ClientConfig) {
        this.config = config

        this.storeName = config.storeName
        this.authToken = config.authToken
        this.sessionId = config.sessionId
        this.siteConfig = {} as SiteConfiguration
        this.store = new StoreResource(this)
        this.cart = new CartResource(this)
        this.product = new ProductResource(this)
        this.customer = new CustomerResource(this)
        this.order = new OrderResource(this)
    }

    fetch(url: string, init?: RequestInit): Promise<Response> {
        if (!url.startsWith("http")) {
            if (this.config.apiUrl) {
                url = this.config.apiUrl + url
            } else {
                if (this.config.env == "testing") {
                    url = 'https://shop-api.testing.shopletzy.com' + url
                } else {
                    url = 'https://shop-api.shopletzy.com' + url
                }
            }
        }

        if (!init) {
            init = {}
        }

        if (this.sessionId) {
            init.headers = { ...init.headers, "x-slz-sessionid": this.sessionId }
        }

        if (this.authToken) {
            init.headers = { ...init.headers, "authorization": "Bearer " + this.authToken }
        }

        if (this.config.headers) {
            init.headers = { ...init.headers, ...this.config.headers }
        }

        return fetch!(url, init)
    }
}

export async function initializeSlzClient(config: ClientConfig): Promise<ShopletzyClient> {
    const client = new ShopletzyClient(config);
    if (!client.storeName) {
        await client.store.loadSiteConfig()
    }
    if (!client.sessionId) {
        client.sessionId = await client.store.newSession()
    }
    return client
}