import { ShopletzyClient } from "./index";
import { Category, Product, ProductCollection } from "./types/index";

export class ProductResource {
    client: ShopletzyClient;
    constructor(client: ShopletzyClient) {
        this.client = client
    }

    async getCategories(ouId: string) {
        const d = await this.client.fetch(`/${this.client.storeName}/v1/categories?ouId=${ouId}`)
        return (await d.json()).categories as Category[]
    }

    async getCollectionBySlug(slug: string) {
        const d = await this.client.fetch(`/${this.client.storeName}/v1/collection-by-slug?slug=${slug}`)
        return await d.json() as ProductCollection
    }

    async getProducts(category: string, ouId: string) {
        const d = await this.client.fetch(`/${this.client.storeName}/v1/products?ouId=${ouId}&category=${category}`)
        return (await d.json()).products as Product[]
    }

    async getProductBySku(sku: string, ouId: string) {
        const d = await this.client.fetch(`/${this.client.storeName}/v1/productskus/${sku}?ouId=${ouId}`)
        return (await d.json()) as Product
    }

    async getProductBySlug(slug: string, ouId: string, variantId?: string) {
        let url = `/${this.client.storeName}/v1/product-by-slug?ouId=${ouId}&slug=${slug}`;
        if (variantId) {
            url += `&variantId=${variantId}`
        }
        const d = await this.client.fetch(url)
        return (await d.json()) as Product
    }

    async getProductCollection(slug: string, ouId: string, excludeOutOfStock?: boolean) {
        const d = await this.client.fetch(`/${this.client.storeName}/v1/productCollection?ouId=${ouId}&slug=${slug}${excludeOutOfStock ? "&excludeOutOfStock=true" : ""}`)
        return (await d.json()).products as Product[]
    }

    async search(q: string, ouId: string) {
        const d = await this.client.fetch(`/${this.client.storeName}/v1/searchProducts?ouId=${ouId}&q=${q}`)
        return (await d.json()).products as Product[]
    }
}