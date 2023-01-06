import { ShopletzyClient } from "./index";
import { Cart, LocationSuggestion, Outlet, PageListing, PlaceDetails, SiteConfiguration } from "./types/index";

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

    async getLandingPageListings(ouId: string) {
        const d = await this.client.fetch(`/${this.client.storeName}/v1/landingPageListings?ouId=${ouId}`)
        return (await d.json()).listings as PageListing[]
    }
}