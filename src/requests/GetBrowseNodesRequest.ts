import { HttpMethod } from '../http/types';
import { BrowseNode, BrowseNodeResource } from '../models/BrowseNode';
import { Language, Marketplace } from '../models/types';
import { CommonRequest, CommonRequestPayload, CommonResponse } from './CommonRequest';

export type GetBrowseNodesResource = BrowseNodeResource;

export interface GetBrowseNodesPayload {
    BrowseNodeIds: string[];
    LanguagesOfPreference?: Language[];
    Marketplace?: Marketplace;
    Resources: GetBrowseNodesResource[];
}

export interface GetBrowseNodesResponse extends CommonResponse {
    BrowseNodesResult: {
        BrowseNodes: BrowseNode[];
    };
}

export class GetBrowseNodesRequest extends CommonRequest<GetBrowseNodesResponse> {
    protected readonly method: HttpMethod = HttpMethod.POST;
    protected readonly path: string = '/paapi5/getbrowsenodes';
    protected readonly target: string = 'com.amazon.paapi5.v1.ProductAdvertisingAPIv1.GetBrowseNodes';

    public constructor(
        private readonly payload: GetBrowseNodesPayload,
        ...commonRequestParams: ConstructorParameters<typeof CommonRequest>
    ) {
        super(...commonRequestParams);
    }

    protected _buildPayload(): CommonRequestPayload & GetBrowseNodesPayload {
        return {
            ...super._buildPayload(),
            ...this.payload,
        };
    }
}
