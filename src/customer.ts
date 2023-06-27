import { ShopletzyClient } from "./index";
import { Category, CustomerAddress as Address, LoginRequest, LoginResponse, Product, Wishlist } from "./types/index";

export class CustomerResource {
    client: ShopletzyClient;
    constructor(client: ShopletzyClient) {
        this.client = client
    }

    async getProfile() {
        const d = await this.client.fetch(`/${this.client.storeName}/v1/profile`)
        const profile = await d.json() as {
            email: string;
            fullName: string;
            id: string;
        }
        return profile
    }

    async login(loginReq: LoginRequest) {
        const d = await this.client.fetch(`/${this.client.storeName}/v1/oauth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginReq)
        })
        const loginResponse = await d.json() as LoginResponse
        this.client.authToken = loginResponse.token
        return loginResponse
    }

    async sendMobileOTP(mobileNo: string, countryCode?: string) {
        const d = await this.client.fetch(`/${this.client.storeName}/v1/sendOTP`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "mobileNo": mobileNo,
                "countryCode": countryCode
            })
        })
        return (await d.json()).success
    }

    async verifyMobileOTP(otp: string, mobileNo: string, countryCode?: string) {
        const d = await this.client.fetch(`/${this.client.storeName}/v1/verifyOTP`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "mobileNo": mobileNo,
                "otp": otp,
                "countryCode": countryCode
            })
        })
        return (await d.json()).success
    }

    async getWishlists() {
        const d = await this.client.fetch(`/${this.client.storeName}/v1/wishlists`)
        return (await d.json()).wishlists as Wishlist[]
    }

    async getWishlistById(wishlistId: string) {
        const d = await this.client.fetch(`/${this.client.storeName}/v1/wishlists/${wishlistId}`)
        return (await d.json()).wishlist as Wishlist
    }

    async addProductToWishlist(productId: string, wishlistId: string) {
        const d = await this.client.fetch(`/${this.client.storeName}/v1/products/${productId}/addToWishlist/${wishlistId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return (await d.json()).isAdded as boolean
    }

    async removeProductFromWishlist(productId: string, wishlistId: string) {
        const d = await this.client.fetch(`/${this.client.storeName}/v1/products/${productId}/removeFromWishlist/${wishlistId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return (await d.json()).isRemoved as boolean
    }

    async getAddresses() {
        const d = await this.client.fetch(`/${this.client.storeName}/v1/addresses`)
        return (await d.json()).addresses as Address[]
    }
}