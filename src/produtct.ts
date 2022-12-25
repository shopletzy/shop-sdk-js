import { ShopletzyClient } from "./index";
import { Category, Product } from "./types/index";

export class ProductResource {
    client: ShopletzyClient;
    constructor(client: ShopletzyClient) {
        this.client = client
    }

    async getCategories(ouId: string) {
        const d = await this.client.fetch(`/${this.client.siteConfig.name}/v1/categories?ouId=${ouId}`)
        return (await d.json()).categories as Category[]
    }

    async getProducts(category: string, ouId: string) {
        const d = await this.client.fetch(`/${this.client.siteConfig.name}/v1/products?ouId=${ouId}&category=${category}`)
        return (await d.json()).products as Product[]
    }

    async getProductBySku(sku: string, ouId: string) {
        const d = await this.client.fetch(`/${this.client.siteConfig.name}/v1/productskus/${sku}?ouId=${ouId}`)
        return (await d.json()) as Product
    }

    async search(q: string, ouId: string) {
        const d = await this.client.fetch(`/${this.client.siteConfig.name}/v1/searchProducts?ouId=${ouId}&q=${q}`)
        return (await d.json()).products as Product[]
    }
}