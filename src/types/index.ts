export type ClientConfig = {
    authToken?: string;
    env: string;
    apiUrl?: string;
    domain: string;
    storeName?: string;
    sessionId?: string;
    headers?: HeadersInit;
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
    defaultOuId: string;
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
    id: string;
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
    id: string;
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
    id: string;
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
    id: string;
    title: string;
    subtitle?: string;
    description?: string;
    categories: string[];
    sku: string;
    slug: string;
    seoTitle: string;
    seoDescription: string;
    images?: string[];
    maxItemsPerOrder: number;
    outlets: OutletProduct[];
    labels: string[];
    addOnGroups?: AddOnGroup[];
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

export type MakePaymentReq = {
    paymentMode: "cod" | "online";
}

export type PaymentSuccessReq = {
    gateway: "razorpay";
    razorpay: {
        paymentId: string;
        orderId: string;
        signature: string;
    }
}

export type PaymentFailureReq = {
    gateway: string;
    razorpay: {
        paymentId: string;
        orderId: string;
        error: any;
    };
}

export type CartItem = {
    id: string;
    title: string;
    subtitle?: string;
    sku: string;
    price: number;
    salePrice?: number;
    quantity: number;
    ouId: string;
}

export type Cart = {
    id: string;
    items: CartItem[];
    cusId?: string;
    sessionId?: string;
    subTotal?: number;
    ouId?: string;
}

export type OrderStatus = "pending" | "awaitingPayment" | "awaitingConfirmation" | "awaitingFulfilment" | "shipped" | "completed" | "refunded" | "partiallyRefunded" | "cancelled" | "declined" | "returned";

export type CustomerAddress = {
    id: string;
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

export type AuthProvider = "google" | "facebook" | "shopletzy";

export type LoginRequest = {
    authProvider: AuthProvider;
    token: string;
    otp?: string;
    cartId?: string; // For Cart Migration
    sessionId?: string;
}

export type LoginResponse = {
    token: string;
    email: string;
    expiresIn: number;
    fullName: string;
    mobileNo: string;
    cusId: string;
    isNewCustomer: boolean;
    cart: {
        id: string;
        cartMigrated: boolean
    }
}

export type Wishlist = {
    id: string;
    name: string;
    productIds: string[];
    cusId: string;
    sid: string;
    createdAt: Date;
    updatedAt: Date;
}

export type CheckoutCart = {
    tz: string;
    addressId: string;
    deliverySlot: {
        id: string;
        slotType: string;
        name?: string;
        orderStart?: string;
        orderEnd?: string;
        date?: string;
        startTime?: string;
        endTime?: string;
        deliveryBefore?: string;
    }
}

export type DeliverySlotType = "fixed" | "flexible";

export type DeliverySlot = {
    id: string;
    name: string;
    slotType: DeliverySlotType;
    orderStart: string;
    orderEnd: string;
    startTime: string;
    endTime: string;
    deliveryBefore: string;
    deliveryArea?: DeliveryArea;
    orderLimit: number;
    isActive: boolean;
}

export type Customer = {
    id: string;
    fullName: string;
    email: string;
    mobileNo?: string;
    addresses?: CustomerAddress[];
    createdAt: Date;
}

export type OrderItem = {
    id: string;
    title: string;
    subtitle?: string;
    sku: string;
    price: number;
    salePrice?: number;
    quantity: number;
    ouId: string;
}

export type OrderDeliverySlot = Omit<DeliverySlot, "sid | isActive | orderLimit | deliveryArea"> & { date: Date }

export type Order = {
    id: string;
    cusId: string;
    orderNo: string;
    customer: Customer;
    status: OrderStatus;
    items: OrderItem[];
    deliverySlot?: OrderDeliverySlot;
    shippingAddress: CustomerAddress;
    shippingDetails?: ShippingDetails;
    billing: CustomerBilling;
    payment?: PaymentDetails;
    ouId: string;
    sid: string;
    createdAt: Date;
    updatedAt: Date;
}

export type DeliveryExec = {
    id: string;
    fullName: string;
    mobileNo: string;
}


export type DeliveryServiceType = "inhouse" | "external";

export type ShippingDetails = {
    deliveryService: DeliveryServiceType;
    deliveryServiceName?: string;
    trackingNo?: string;
    deliveryExec?: DeliveryExec;
}

export type CustomerBilling = {
    itemSubtotal: number;
    tax?: number;
    additionalCharges?: AdditionalCharge[];
    additionalChargesSubtotal?: number;
    discountCode?: string;
    discount?: number;
    totalBeforeTax?: number;
    toPay: number;
    currency: Currency;
}

export type Currency = "INR";

export type PaymentDetails = {
    mode: PaymentMode;
    refundedAmount?: number;
    gateway: PaymentGateway;
    razorpay: RazorpayResponse;
}

export type RazorpayResponse = {
    paymentId: string;
    orderId: string;
    signature: string;
}

export type ChargeType = "delivery" | "convenience" | "installation" | "packaging" | "custom"

type ChargeAppliesTo = "deliverySlot" | "outlet" | "store"

export type Charge = {
    id: string;
    chargeType: ChargeType;
    label: string;
    appliesTo: ChargeAppliesTo;
    deliverySlotIds: string[];
    outletIds: string[];
    fee: ChargeFee;
    tax: number;
    sid: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

type ChargeFee = {
    type: "flat" | "bucket";
    flatFee: number;
    buckets: BucketFee[];
}

type BucketFee = {
    from: number;
    to: number;
    fee: number;
}

export type AdditionalCharge = {
    id: string;
    type: ChargeType;
    appliesTo: ChargeAppliesTo;
    label: string;
    fee: number;
    tax?: number;
}

export type PageRedirect = {
    id: string;
    source: string;
    destination: string;
    permanent: boolean;
    sid: string;
}

export type Blog = {
    id: string;
    title: string;
    slug: string;
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
    blogTemplate: string;
    postTemplate: string;
    featuredPosts?: Post[];
    recentPosts?: Post[];
    sid: string;
    createdAt: Date;
}

export type Post = {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    lexical: string;
    status: "draft" | "published";
    feature_image: string;
    featured: boolean;
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
    tags: string[];
    authors: { id: string, fullName: string }[];
    type: "post" | "page";
    codeInjectionHead: string;
    codeInjectionFoot: string;
    customTemplate: string;
    blogTitle: string;
    blogId?: string;
}

export type AddOnGroup = {
    id: string;
    title: string;
    subtitle: string;
    mandatory: boolean;
    minSelection: number;
    maxSelection: number;
    addOns: AddOn[];
    productId: string;
}

export type AddOn = {
    id: string;
    title: string;
    price: number;
    taxRate: number;
    addOnGroupId: string;
}

export type FAQQuestion = {
    id: string;
    question: string;
    answer: string;
    isPublished: boolean;
    sid: string;
    createdAt: Date;
    updatedAt: Date;
}

export type FAQ = {
    id: string;
    name: string;
    questions?: FAQQuestion[];
    isPublished: boolean;
    sid: string;
    createdAt: Date;
}