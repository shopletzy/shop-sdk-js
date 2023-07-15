import { ShopletzyClient, SlzError } from "./index";
import { Category, Customer, CustomerAddress, LoginRequest, LoginResponse, Product, Wishlist } from "./types/index";

export class CustomerResource {
    client: ShopletzyClient;
    constructor(client: ShopletzyClient) {
        this.client = client
    }

    async getProfile() {
        const d = await this.client.fetch(`/${this.client.storeName}/v1/profile`)
        return await d.json() as Customer
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

    async signup(email: string, fullName: string) {
        const d = await this.client.fetch(`/${this.client.storeName}/v1/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                fullName
            })
        })
        return (await d.json()).token as string
    }

    async sendLoginOTP(loginId: string, type: "email" | "mobileNo") {
        const payload: any = {};

        if (type == "email") {
            payload.email = loginId
        } else {
            payload.mobileNo = loginId
        }

        const d = await this.client.fetch(`/${this.client.storeName}/v1/otpLogin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        })
        return (await d.json()).token as string
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
        return (await d.json()).addresses as CustomerAddress[]
    }

    async addAddress(address: CustomerAddress) {
        const d = await this.client.fetch(`/${this.client.storeName}/v1/addresses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(address)
        })
        return (await d.json()).addressId as string
    }

    async updateAddress(addressId: string, address: CustomerAddress) {
        const d = await this.client.fetch(`/${this.client.storeName}/v1/addresses/${addressId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(address)
        })
        return (await d.json()).newAddressId as string
    }

    async deleteAddress(addressId: string) {
        const d = await this.client.fetch(`/${this.client.storeName}/v1/addresses/${addressId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return (await d.json()).isDeleted as boolean
    }
}