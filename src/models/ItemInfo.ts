import { Dimension, Language, MultipleValuesAttribute, Price, Resources, SingleValueAttribute } from './types';

export enum RoleType {
    AUTHOR = 'author',
    ACTOR = 'actor',
    DIRECTOR = 'director',
}

export interface Contributor {
    Locale: Language;
    Name: string;
    Role: string;
    RoleType: RoleType;
}

export interface ByLineInfo {
    Brand: SingleValueAttribute<string, 'Brand'>;
    Contributors: Contributor[];
    Manufacturer: SingleValueAttribute<string, 'Manufacturer'>;
}

export interface Classifications {
    Binding: SingleValueAttribute<string, 'Binding'>;
    ProductGroup: SingleValueAttribute<string, 'ProductGroup'>;
}

export interface ContentInfo {
    Edition: SingleValueAttribute<string, 'Edition'>;
    Languages: MultipleValuesAttribute<string, 'Language'>;
    PagesCount: SingleValueAttribute<number, 'NumberOfPages'>;
    PublicationDate: SingleValueAttribute<string, 'PublicationDate'>;
}

export interface ContentRating {
    AudienceRating: SingleValueAttribute<string, 'AudienceRating'>;
}

export interface ExternalIds {
    EANs: MultipleValuesAttribute<string, 'EAN'>;
    ISBNs: MultipleValuesAttribute<string, 'ISBN'>;
    UPCs: MultipleValuesAttribute<string, 'UPC'>;
}

export type Features = MultipleValuesAttribute<string, 'Features'>;

export interface ManufactureInfo {
    ItemPartNumber: SingleValueAttribute<string, 'PartNumber'>;
    Model: SingleValueAttribute<string, 'Model'>;
    Warranty: SingleValueAttribute<string, 'Warranty'>;
}

export interface ItemDimensions {
    Height: Dimension<'Height'>;
    Length: Dimension<'Length'>;
    Weight: Dimension<'Weight'>;
    Width: Dimension<'Width'>;
}

export interface ProductInfo {
    Color: SingleValueAttribute<string, 'Color'>;
    IsAdultProduct: SingleValueAttribute<string, 'IsAdultProduct'>;
    ItemDimensions: ItemDimensions;
    ReleaseDate: SingleValueAttribute<string, 'ReleaseDate'>;
    Size: SingleValueAttribute<string, 'Size'>;
    UnitCount: SingleValueAttribute<number, 'NumberOfItems'>;
}

export interface TechnicalInfo {
    Formats: MultipleValuesAttribute<string, 'Format'>;
    EnergyEfficiencyClass: SingleValueAttribute<string, 'EnergyEfficiencyClass'>;
}

export type Title = SingleValueAttribute<string, 'Title'>;

export interface TradeInInfo {
    IsEligibleForTradeIn: boolean;
    Price: Price;
}

export interface ItemInfo {
    ByLineInfo?: ByLineInfo;
    Classifications?: Classifications;
    ContentInfo?: ContentInfo;
    ContentRating?: ContentRating;
    ExternalIds?: ExternalIds;
    Features?: Features;
    ManufactureInfo?: ManufactureInfo;
    ProductInfo?: ProductInfo;
    TechnicalInfo?: TechnicalInfo;
    Title?: Title;
    TradeInInfo?: TradeInInfo;
}

export type ItemInfoResource = Resources<ItemInfo, 'ItemInfo.'>;
