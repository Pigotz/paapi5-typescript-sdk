import { NullableKeys, Prefix } from '../types';

export type Resources<Interface, ResourcePrefix = ''> = Prefix<NullableKeys<Interface>, ResourcePrefix>;

export interface APIError {
    __type: string;
    Code: string;
    Message: string;
}

export type Marketplace =
    | 'www.amazon.ae'
    | 'www.amazon.ca'
    | 'www.amazon.co.jp'
    | 'www.amazon.co.uk'
    | 'www.amazon.com'
    | 'www.amazon.com.au'
    | 'www.amazon.com.br'
    | 'www.amazon.com.mx'
    | 'www.amazon.com.tr'
    | 'www.amazon.de'
    | 'www.amazon.es'
    | 'www.amazon.fr'
    | 'www.amazon.in'
    | 'www.amazon.it'
    | 'www.amazon.nl'
    | 'www.amazon.sa'
    | 'www.amazon.se'
    | 'www.amazon.sg';

export type Language =
    | 'ar_AE'
    | 'cs_CZ'
    | 'de_DE'
    | 'en_AE'
    | 'en_AU'
    | 'en_CA'
    | 'en_GB'
    | 'en_IN'
    | 'en_SG'
    | 'en_US'
    | 'es_ES'
    | 'es_MX'
    | 'es_US'
    | 'fr_CA'
    | 'fr_FR'
    | 'it_IT'
    | 'ja_JP'
    | 'ko_KR'
    | 'nl_NL'
    | 'pl_PL'
    | 'pt_BR'
    | 'sv_SE'
    | 'tr_TR'
    | 'zh_CN'
    | 'zh_TW';

export type Currency =
    | 'AED'
    | 'AMD'
    | 'ARS'
    | 'AUD'
    | 'AWG'
    | 'AZN'
    | 'BGN'
    | 'BND'
    | 'BOB'
    | 'BRL'
    | 'BSD'
    | 'BZD'
    | 'CAD'
    | 'CLP'
    | 'CNY'
    | 'COP'
    | 'CRC'
    | 'DOP'
    | 'EGP'
    | 'EUR'
    | 'GBP'
    | 'GHS'
    | 'GTQ'
    | 'HKD'
    | 'HNL'
    | 'HUF'
    | 'IDR'
    | 'ILS'
    | 'INR'
    | 'JMD'
    | 'JPY'
    | 'KES'
    | 'KHR'
    | 'KRW'
    | 'KYD'
    | 'KZT'
    | 'LBP'
    | 'MAD'
    | 'MNT'
    | 'MOP'
    | 'MUR'
    | 'MXN'
    | 'MYR'
    | 'NAD'
    | 'NGN'
    | 'NOK'
    | 'NZD'
    | 'PAB'
    | 'PEN'
    | 'PHP'
    | 'PYG'
    | 'QAR'
    | 'RUB'
    | 'SAR'
    | 'SEK'
    | 'SGD'
    | 'THB'
    | 'TRY'
    | 'TTD'
    | 'TWD'
    | 'TZS'
    | 'USD'
    | 'UYU'
    | 'VND'
    | 'XCD'
    | 'ZAR';

export type SearchIndex =
    | 'All'
    | 'AmazonVideo'
    | 'Apparel'
    | 'Appliances'
    | 'ArtsAndCrafts'
    | 'Automotive'
    | 'Baby'
    | 'Beauty'
    | 'Books'
    | 'Classical'
    | 'Collectibles'
    | 'Computers'
    | 'CreditCards'
    | 'DigitalEducationalResources'
    | 'DigitalMusic'
    | 'Electronics'
    | 'EverythingElse'
    | 'Fashion'
    | 'FashionBaby'
    | 'FashionBoys'
    | 'FashionGirls'
    | 'FashionMen'
    | 'FashionWomen'
    | 'ForeignBooks'
    | 'Furniture'
    | 'GardenAndOutdoor'
    | 'GiftCards'
    | 'GroceryAndGourmetFood'
    | 'Handmade'
    | 'HealthPersonalCare'
    | 'Hobbies'
    | 'HomeAndKitchen'
    | 'Industrial'
    | 'IndustrialAndScientific'
    | 'Jewelry'
    | 'KindleStore'
    | 'Lighting'
    | 'LocalServices'
    | 'Luggage'
    | 'LuxuryBeauty'
    | 'Magazines'
    | 'Miscellaneous'
    | 'MobileAndAccessories'
    | 'MobileApps'
    | 'MoviesAndTV'
    | 'Music'
    | 'MusicalInstruments'
    | 'OfficeProducts'
    | 'PetSupplies'
    | 'Photo'
    | 'Shoes'
    | 'Software'
    | 'SportsAndOutdoors'
    | 'ToolsAndHomeImprovement'
    | 'Toys'
    | 'ToysAndGames'
    | 'Vehicles'
    | 'VHS'
    | 'VideoGames'
    | 'Watches';

export interface SingleValueAttribute<ValueType extends string | number | boolean, LabelType = string> {
    DisplayValue: ValueType;
    Label: LabelType;
    Locale: Language;
}

export interface Dimension<LabelType = string> extends SingleValueAttribute<number, LabelType> {
    Unit: string;
}

export interface MultipleValuesAttribute<ValueType extends string | number | boolean, LabelType = string> {
    DisplayValues: {
        DisplayValue: ValueType;
        Type: string;
    }[];
    Label: LabelType;
    Locale: Language;
}

export interface Price {
    Amount: number;
    Currency: Currency;
    DisplayAmount: string;
}

export interface PriceWithPricePerUnit extends Price {
    PricePerUnit: number;
}
