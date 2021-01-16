export interface SearchRefinementBin {
    Id: string;
    DisplayName: string;
}

export interface SearchRefinement {
    Id: string;
    DisplayName: string;
    Bins: SearchRefinementBin[];
}

export interface SearchRefinements {
    SearchIndex?: SearchRefinement;
    BrowseNode?: SearchRefinement;
    OtherRefinements?: SearchRefinement[];
}
