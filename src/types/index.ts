export type ClientConfig = {
    authToken?: string;
    env: string;
    domain: string;
    storeName?: string;
    sessionId?: string;
    fetch?: (input: RequestInfo, init?: RequestInit | undefined) => Promise<Response>;
}

export type SiteConfiguration = {
    sid: string;
    name: string;
    brandName: string;
    settings?: any;
    businessHours?: BusinessHours;
    authCredentials?: AuthProviderCredential;
    paymentGateway?: PaymentGatewayCredentials;
    siteStatus: SiteStatus;
    webPushKey: string;
    theme: string;
}

export type SiteStatusCode = "live" | "maintenance";
export type SiteStatus = {
    status: SiteStatusCode;
    msgTitle?: string;
    msgSubtitle?: string;
}

export type PaymentGatewayCredentials = {
    gateway: PaymentGateway;
    razorpay: RazorpayCredentials;
}

export type RazorpayCredentials = {
    keyId: string;
    secret: string;
};

export type AuthProviderCredential = {
    google?: GoogleCredentials;
    facebook?: FacebookCredentials;
}

export type GoogleCredentials = {
    web: string;
    android: string;
    ios: string;
}

export type FacebookCredentials = {
    appId: string;
    appSecret: string;
}

export type PaymentGateway = "razorpay";
export type PaymentMode = "cod" | "online";

export type DayOfWeek = "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat"

export type OpenCloseHours = {
    openTime: string;
    closeTime: string;
}

export type BusinessHoursForDay = {
    closed?: boolean;
    open24hours?: boolean;
    hours?: OpenCloseHours[]
}

export type BusinessHourDays = {
    [day in DayOfWeek]: BusinessHoursForDay
}

export type BusinessHours = {
    days: BusinessHourDays;
    closed: boolean;
    closedMessage: string;
}

export type LocationSuggestion = {
    placeId: string;
    mainText: string;
    secondaryText: string;
}

export type Geometry = {
    type: string;
    coordinates: number[];
}

export type PlusCode = {
    compoundCode?: string;
    globalCode?: string;
}

export type PlaceDetails = {
    placeId: string;
    name?: string;
    addressComponents?: PlaceAddressComponents;
    plusCode: PlusCode;
    formattedAddress: string;
    geometry: Geometry;
}

export type PlaceAddressComponents = {
    addressLine?: string;
    area?: string;
    city?: string;
    state?: string;
    country?: string;
    zipcode?: string;
}

export type ContactNumber = {
    type: string;
    phone: string;
}

export type Address = {
    _id: string;
    addressLine1: string;
    addressLine2?: string;
    landmark?: string;
    area: string;
    zipcode: string;
    city: string;
    state: string;
    phoneNo?: string;
    country: string;
}

export type DeliverySlotConfig = {
    slotIds: string[];
}

export type Outlet = {
    _id: string;
    name: string;
    address: Address;
    placeDetails: PlaceDetails,
    contactNumbers: ContactNumber[];
    deliveryArea: DeliveryArea;
    businessHours?: BusinessHours;
    deliverySlotConfig?: DeliverySlotConfig;
}

export type DeliveryAreaType = "maxDistance" | "city" | "locality" | "state" | "postalCode" | "country";
export type DeliveryArea = {
    type: DeliveryAreaType;
    maxDistance?: number;
    coordinates?: number[];
    postalCodes?: string[];
    localities?: string[];
    cities?: string[];
    states?: string[];
    countries?: string[];
}

export type Category = {
    _id: string;
    title: string;
    parent: string;
    category: string;
    description: string;
    icon: string;
    image: string;
}

export type Tax = {
    cgstPercent: number;
    sgstPercent: number;
    cgst: number;
    sgst: number;
    total: number;
}

export type Product = {
    _id: string;
    title: string;
    subtitle?: string;
    description?: string;
    categories: string[];
    sku: string;
    images?: string[];
    maxItemsPerOrder: number;
    outlets: OutletProduct[];
    labels: string[];
}

export type OutletProduct = {
    ouId: string;
    price: number;
    salePrice?: number;
    tax?: Tax;
    displayOrder?: number;
    stock: number;
    outOfStock: boolean;
    isAvailable: boolean;
}

export type PageListing = {
    title: string
    products: Product[]
}

export type CartUpdateReq = {
    ouId: string;
    productId: string;
    quantity: number;
}

export type CartItem = {
    _id: string;
    title: string;
    subtitle?: string;
    sku: string;
    price: number;
    salePrice?: number;
    quantity: number;
    ouId: string;
}

export type Cart = {
    _id: string;
    items: CartItem[];
    cusId?: string;
    sessionId?: string;
    subTotal?: number;
    ouId?: string;
}

export type OrderStatus = "pending" | "awaitingPayment" | "awaitingConfirmation" | "awaitingFulfilment" | "shipped" | "completed" | "refunded" | "partiallyRefunded" | "cancelled" | "declined" | "returned";

export type CustomerAddress = {
    _id: string;
    fullName: string;
    houseName: string;
    phoneNo: string;
    landmark: string;
    addressLine: string;
    area: string;
    city: string;
    state: string;
    country: string;
    zipcode: string;
    placeDetails: PlaceDetails;
}