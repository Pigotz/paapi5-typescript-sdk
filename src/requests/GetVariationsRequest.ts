import { HttpMethod } from '../http/types';
import { BrowseNodeInfoResource } from '../models/BrowseNodeInfo';
import { Images, ImagesResource } from '../models/Images';
import { ItemInfo, ItemInfoResource } from '../models/ItemInfo';
import { Offers, OffersResource } from '../models/Offers';
import { Currency, Language, Marketplace } from '../models/types';
import { VariationSummary, VariationSummaryResource } from '../models/VariationSummary';
import { CommonRequest, CommonRequestPayload, CommonResponse } from './CommonRequest';

export type GetVariationsCondition = 'Any' | 'New' | 'Used' | 'Collectible' | 'Refurbished';

export type GetVariationsMerchant = 'All' | 'Amazon';

export type GetVariationsResource =
    | BrowseNodeInfoResource
    | ImagesResource
    | ItemInfoResource
    | OffersResource
    | 'ParentASIN'
    | VariationSummaryResource;

export interface GetVariationsPayload {
    ASIN: string;
    Condition?: GetVariationsCondition;
    CurrencyOfPreference?: Currency;
    LanguagesOfPreference?: Language[];
    Marketplace?: Marketplace;
    Merchant?: GetVariationsMerchant;
    OfferCount?: number;
    Resources?: GetVariationsResource[];
    VariationCount?: number;
    VariationPage?: number;
}

export interface VariationResultItemAttribute {
    Name: string;
    Value: string;
}

export interface VariationResultItem {
    ASIN: string;
    DetailPageURL: string;
    ParentASIN?: string;
    Images?: Images;
    ItemInfo?: ItemInfo;
    Offers?: Offers;
    VariationAttributes: VariationResultItemAttribute[];
}

export interface VariationResult {
    Items: VariationResultItem[];
    VariationSummary: VariationSummary;
}

export interface GetVariationsResponse extends CommonResponse {
    VariationResult: VariationResult;
}

export class GetVariationsRequest extends CommonRequest<GetVariationsResponse> {
    protected readonly method: HttpMethod = HttpMethod.POST;
    protected readonly path: string = '/paapi5/getvariations';
    protected readonly target: string = 'com.amazon.paapi5.v1.ProductAdvertisingAPIv1.GetVariations';

    public constructor(
        private readonly payload: GetVariationsPayload,
        ...commonRequestParams: ConstructorParameters<typeof CommonRequest>
    ) {
        super(...commonRequestParams);
    }

    protected _buildPayload(): CommonRequestPayload & GetVariationsPayload {
        return {
            ...super._buildPayload(),
            ...this.payload,
        };
    }
}
