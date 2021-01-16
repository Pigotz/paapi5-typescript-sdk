import { HttpMethod } from '../http/types';
import { BrowseNodeInfoResource } from '../models/BrowseNodeInfo';
import { Images, ImagesResource } from '../models/Images';
import { ItemInfo, ItemInfoResource } from '../models/ItemInfo';
import { Offers, OffersResource } from '../models/Offers';
import { SearchRefinements } from '../models/SearchRefinements';
import { Currency, Language, Marketplace, SearchIndex } from '../models/types';
import { CommonRequest, CommonRequestPayload, CommonResponse } from './CommonRequest';

export type SearchItemsAvailability = 'Available' | 'IncludeOutOfStock';

export type SearchItemsCondition = 'Any' | 'New' | 'Used' | 'Collectible' | 'Refurbished';

export type SearchItemsDeliveryFlag = 'AmazonGlobal' | 'FreeShipping' | 'FulfilledByAmazon' | 'Prime';

export type SearchItemsMerchant = 'All' | 'Amazon';

export type SearchItemsSortBy =
    | 'AvgCustomerReviews'
    | 'Featured'
    | 'NewestArrivals'
    | 'Price:HighToLow'
    | 'Price:LowToHigh'
    | 'Relevance';

export type SearchItemsResource =
    | BrowseNodeInfoResource
    | ImagesResource
    | ItemInfoResource
    | OffersResource
    | 'ParentASIN'
    | 'SearchRefinements';

export interface SearchItemsPayload {
    Actor?: string;
    Artist?: string;
    Author?: string;
    Availability?: SearchItemsAvailability;
    Brand?: string;
    BrowseNodeId?: string;
    Condition?: SearchItemsCondition;
    CurrencyOfPreference?: Currency;
    DeliveryFlags?: SearchItemsDeliveryFlag[];
    ItemCount?: number;
    ItemPage?: number;
    Keywords?: string;
    LanguagesOfPreference?: Language[];
    Marketplace?: Marketplace;
    MaxPrice?: number;
    Merchant?: SearchItemsMerchant;
    MinPrice?: number;
    MinReviewsRating?: number;
    MinSavingPercent?: number;
    OfferCount?: number;
    Properties?: Record<string, string>;
    Resources?: SearchItemsResource[];
    SearchIndex?: SearchIndex;
    SortBy?: SearchItemsSortBy;
    Title?: string;
}

export interface SearchResultItem {
    ASIN: string;
    DetailPageURL: string;
    ParentASIN?: string;
    Images?: Images;
    ItemInfo?: ItemInfo;
    Offers?: Offers;
}

export interface SearchResult {
    Items: SearchResultItem[];
    SearchRefinements?: SearchRefinements;
    SearchURL: string;
    TotalResultCount: number;
}

export interface SearchItemsResponse extends CommonResponse {
    SearchResult: SearchResult;
}

export class SearchItemsRequest extends CommonRequest<SearchItemsResponse> {
    protected readonly method: HttpMethod = HttpMethod.POST;
    protected readonly path: string = '/paapi5/searchitems';
    protected readonly target: string = 'com.amazon.paapi5.v1.ProductAdvertisingAPIv1.SearchItems';

    public constructor(
        private readonly payload: SearchItemsPayload,
        ...commonRequestParams: ConstructorParameters<typeof CommonRequest>
    ) {
        super(...commonRequestParams);
    }

    protected _buildPayload(): CommonRequestPayload & SearchItemsPayload {
        return {
            ...super._buildPayload(),
            ...this.payload,
        };
    }
}
