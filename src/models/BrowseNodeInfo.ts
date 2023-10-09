import { BrowseNode, BrowseNodeResource } from './BrowseNode';
import { Resources } from './types';
import { WebsiteSalesRank } from './WebsiteSalesRank';
import { CustomerReviews } from './CustomerReviews';

export interface BrowseNodeInfo {
    BrowseNodes?: BrowseNode[];
    WebsiteSalesRank?: WebsiteSalesRank;
    CustomerReviews?: CustomerReviews;
}

export type BrowseNodeInfoResource = Resources<BrowseNodeInfo, 'BrowseNodeInfo.'> | BrowseNodeResource;
