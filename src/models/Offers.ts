import { Language, PriceWithPricePerUnit, Resources, SingleValueAttribute } from './types';

export type AvailabilityType = 'Now' | 'Backorderable' | 'Preorderable';

export interface Availability {
    MinOrderQuantity?: number;
    MaxOrderQuantity?: number;
    Message?: string;
    Type?: AvailabilityType;
}

export type AvailabilityResource = Resources<Availability, 'Offers.Listings.Availability.'>;

export type ConditionValue = 'New' | 'Used' | 'Collectible' | 'Refurbished';

export interface ConditionNote {
    Locale: Language;
    Value: string;
}

export type SubConditionValue =
    | 'Acceptable'
    | 'Club'
    | 'Good'
    | 'LikeNew'
    | 'New'
    | 'OEM'
    | 'Other'
    | 'OpenBox'
    | 'Poor'
    | 'Refurbished'
    | 'RefurbishedWarranty'
    | 'VeryGood'
    | 'Warranty';

export interface SubCondition extends SingleValueAttribute<string> {
    Value: SubConditionValue;
}

export interface Condition extends SingleValueAttribute<string> {
    ConditionNote?: ConditionNote;
    Value: ConditionValue;
    SubCondition?: SubCondition;
}

export type ConditionResource = Resources<Condition, 'Offers.Listings.Condition.'>;

export interface DeliveryInfo {
    IsAmazonFulfilled?: boolean;
    IsFreeShippingEligible?: boolean;
    IsPrimeEligible?: boolean;
}

export type DeliveryInfoResource = Resources<DeliveryInfo, 'Offers.Listings.DeliveryInfo.'>;

export interface LoyaltyPoints {
    Points: number;
}

export interface MerchantInfo {
    DefaultShippingCountry: string;
    FeedbackCount: number;
    FeedbackRating: number;
    Id: string;
    Name: string;
}

export interface OfferPrice extends PriceWithPricePerUnit {
    Savings: PriceWithPricePerUnit & {
        Percentage: number;
    };
}

export interface ProgramEligibility {
    IsPrimeExclusive?: boolean;
    IsPrimePantry?: boolean;
}

export type ProgramEligibilityResource = Resources<ProgramEligibility, 'Offers.Listings.ProgramEligibility.'>;

export interface Promotions extends PriceWithPricePerUnit {
    DiscountPercent: string;
    Type: 'SNS';
}

export interface Listing {
    Availability: Availability;
    Condition?: Condition;
    DeliveryInfo: DeliveryInfo;
    Id: string;
    IsBuyBoxWinner?: boolean;
    LoyaltyPoints: LoyaltyPoints;
    MerchantInfo?: MerchantInfo;
    Price?: OfferPrice;
    ProgramEligibility: ProgramEligibility;
    Promotions?: Promotions;
    SavingBasis?: PriceWithPricePerUnit;
    ViolateMAP: boolean;
}

export type ListingResource =
    | Resources<Listing, 'Offers.Listings.'>
    | AvailabilityResource
    | ConditionResource
    | DeliveryInfoResource
    | ProgramEligibilityResource;

export interface Summary {
    Condition: Condition;
    HighestPrice?: PriceWithPricePerUnit;
    LowestPrice?: PriceWithPricePerUnit;
    OfferCount?: number;
}

export type SummaryResource = Resources<Summary, 'Offers.Summaries.'>;

export interface Offers {
    Listings: Listing[];
    Summaries: Summary[];
}

export type OffersResource = ListingResource | SummaryResource;
