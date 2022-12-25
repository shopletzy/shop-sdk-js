import { ShopletzyClient } from "./index";
import { Category, CustomerAddress as Address, Product } from "./types/index";

export class AddressResource {
    client: ShopletzyClient;
    constructor(client: ShopletzyClient) {
        this.client = client
    }

    async getAddresses() {
        const d = await this.client.fetch(`/${this.client.siteConfig.name}/v1/addresses`)
        return (await d.json()).addresses as Address[]
    }
}