import { HttpMethod } from '../http/types';
import { BrowseNodeInfoResource } from '../models/BrowseNodeInfo';
import { CustomerReviewsResource } from '../models/CustomerReviews';
import { Images, ImagesResource } from '../models/Images';
import { ItemInfo, ItemInfoResource } from '../models/ItemInfo';
import { Offers, OffersResource } from '../models/Offers';
import { Currency, Language, Marketplace } from '../models/types';
import { CommonRequest, CommonRequestPayload, CommonResponse } from './CommonRequest';

export type GetItemsCondition = 'Any' | 'New' | 'Used' | 'Collectible' | 'Refurbished';

export type GetItemsMerchant = 'All' | 'Amazon';

export type GetItemsResource =
    | BrowseNodeInfoResource
    | CustomerReviewsResource
    | ImagesResource
    | ItemInfoResource
    | OffersResource
    | 'ParentASIN';

export interface GetItemsPayload {
    Condition?: GetItemsCondition;
    CurrencyOfPreference?: Currency;
    ItemIdType?: 'ASIN';
    ItemIds: string[];
    LanguagesOfPreference?: Language[];
    Marketplace?: Marketplace;
    Merchant?: GetItemsMerchant;
    OfferCount?: number;
    Resources?: GetItemsResource[];
}

export interface Item {
    ASIN: string;
    DetailPageURL: string;
    ParentASIN?: string;
    Images?: Images;
    ItemInfo?: ItemInfo;
    Offers?: Offers;
}

export interface ItemsResult {
    Items: Item[];
}

export interface GetItemsResponse extends CommonResponse {
    ItemsResult: ItemsResult;
}

export class GetItemsRequest extends CommonRequest<GetItemsResponse> {
    protected readonly method: HttpMethod = HttpMethod.POST;
    protected readonly path: string = '/paapi5/getitems';
    protected readonly target: string = 'com.amazon.paapi5.v1.ProductAdvertisingAPIv1.GetItems';

    public constructor(
        private readonly payload: GetItemsPayload,
        ...commonRequestParams: ConstructorParameters<typeof CommonRequest>
    ) {
        super(...commonRequestParams);
    }

    protected _buildPayload(): CommonRequestPayload & GetItemsPayload {
        return {
            ...super._buildPayload(),
            ...this.payload,
        };
    }
}
