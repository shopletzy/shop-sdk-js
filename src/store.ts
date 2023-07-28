import { ShopletzyClient } from "./index";
import { Blog, Cart, LocationSuggestion, Outlet, PageListing, PageRedirect, PlaceDetails, Post, SiteConfiguration } from "./types/index";

export class StoreResource {
    client: ShopletzyClient;
    constructor(client: ShopletzyClient) {
        this.client = client
    }

    async loadSiteConfig() {
        const d = await this.client.fetch('/v1/siteConfiguration?domain=' + this.client.config.domain)
        this.client.siteConfig = await d.json() as SiteConfiguration
        this.client.storeName = this.client.siteConfig.name
        return this.client.siteConfig
    }

    getTheme() {
        return this.client.siteConfig.theme || "elementary"
    }

    async autocompleteLocation(input: string, sessionToken: string) {
        const d = await this.client.fetch(`/locations/v1/autocomplete?input=${input}&sessionToken=${sessionToken}`)
        return (await d.json()).suggestions as LocationSuggestion[]
    }

    async getPlaceDetails(placeId: string, sessionToken: string) {
        const d = await this.client.fetch(`/locations/v1/placeDetails?placeId=${placeId}&sessionToken=${sessionToken}`)
        return await d.json() as PlaceDetails
    }

    async reverseGeocode(lat: number, lng: number) {
        const d = await this.client.fetch(`/locations/v1/reverseGeocode?lat=${lat}&lng=${lng}`)
        return await d.json() as PlaceDetails
    }

    async newSession() {
        const d = await this.client.fetch(`/${this.client.storeName}/v1/newSession`)
        return (await d.json()).sessionId
    }

    async getNearByOutlets(placeDetail: PlaceDetails) {
        const d = await this.client.fetch(`/${this.client.storeName}/v1/nearByOutlets`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(placeDetail)
        })
        return (await d.json()).outlets as Outlet[]
    }

    async getOutletById(ouId: string) {
        const d = await this.client.fetch(`/${this.client.storeName}/v1/outlets/${ouId}`)
        return (await d.json()) as Outlet
    }

    async getLandingPageListings(ouId: string) {
        const d = await this.client.fetch(`/${this.client.storeName}/v1/landingPageListings?ouId=${ouId}`)
        return (await d.json()).listings as PageListing[]
    }

    async getPageRedirects() {
        const d = await this.client.fetch(`/${this.client.storeName}/v1/pageRedirects`)
        return (await d.json()).pageRedirects as PageRedirect[]
    }

    async getBlogs() {
        const d = await this.client.fetch(`/${this.client.storeName}/v1/blogs`)
        return (await d.json()).blogs as Blog[]
    }

    async getBlogBySlug(slug: string) {
        const d = await this.client.fetch(`/${this.client.storeName}/v1/blog-by-slug?slug=${slug}`)
        return await d.json() as Blog
    }

    async getPostBySlug(slug: string) {
        const d = await this.client.fetch(`/${this.client.storeName}/v1/post-by-slug?slug=${slug}`)
        if (d.status != 200) {
            throw new Error((await d.json()).message);
        }
        return await d.json() as Post
    }
}