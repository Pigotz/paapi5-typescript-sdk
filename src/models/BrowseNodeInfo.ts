import { BrowseNode, BrowseNodeResource } from './BrowseNode';
import { Resources } from './types';
import { WebsiteSalesRank } from './WebsiteSalesRank';

export interface BrowseNodeInfo {
    BrowseNodes?: BrowseNode[];
    WebsiteSalesRank?: WebsiteSalesRank;
}

export type BrowseNodeInfoResource = Resources<BrowseNodeInfo, 'BrowseNodeInfo.'> | BrowseNodeResource;
