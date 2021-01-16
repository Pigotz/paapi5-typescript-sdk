import axios from 'axios';

import { SignHelper } from '../auth/SignHelper';
import { Headers, HttpMethod, Payload } from '../http/types';
import { APIError } from '../models/types';

export enum PartnerType {
    ASSOCIATES = 'Associates',
}

export enum Host {
    AUSTRALIA = 'webservices.amazon.com.au',
    BRAZIL = 'webservices.amazon.com.br',
    CANADA = 'webservices.amazon.ca',
    FRANCE = 'webservices.amazon.fr',
    GERMANY = 'webservices.amazon.de',
    INDIA = 'webservices.amazon.in',
    ITALY = 'webservices.amazon.it',
    JAPAN = 'webservices.amazon.co.jp',
    MEXICO = 'webservices.amazon.com.mx',
    NETHERLANDS = 'webservices.amazon.nl',
    SINGAPORE = 'webservices.amazon.sg',
    SAUDI_ARABIA = 'webservices.amazon.sa',
    SPAIN = 'webservices.amazon.es',
    SWEDEN = 'webservices.amazon.se',
    TURKEY = 'webservices.amazon.com.tr',
    UNITED_ARAB_EMIRATES = 'webservices.amazon.ae',
    UNITED_KINGDOM = 'webservices.amazon.co.uk',
    UNITED_STATES = 'webservices.amazon.com',
}

export enum Region {
    AUSTRALIA = 'us-west-2',
    BRAZIL = 'us-east-1',
    CANADA = 'us-east-1',
    FRANCE = 'eu-west-1',
    GERMANY = 'eu-west-1',
    INDIA = 'eu-west-1',
    ITALY = 'eu-west-1',
    JAPAN = 'us-west-2',
    MEXICO = 'us-east-1',
    NETHERLANDS = 'eu-west-1',
    SINGAPORE = 'us-west-2',
    SAUDI_ARABIA = 'eu-west-1',
    SPAIN = 'eu-west-1',
    SWEDEN = 'eu-west-1',
    TURKEY = 'eu-west-1',
    UNITED_ARAB_EMIRATES = 'eu-west-1',
    UNITED_KINGDOM = 'eu-west-1',
    UNITED_STATES = 'us-east-1',
}

export interface CommonRequestHeaders extends Headers {
    'content-encoding': string;
    'content-type': string;
    host: string;
    'x-amz-target': string;
    'x-amz-date': string;
    authorization: string;
}

export interface CommonRequestPayload extends Payload {
    PartnerTag: string;
    PartnerType: PartnerType;
}

export interface CommonResponse {
    Errors: APIError[];
}

export class CommonRequest<ResponseType extends CommonResponse = CommonResponse> {
    protected readonly service: string = 'ProductAdvertisingAPI';
    protected readonly method: HttpMethod = HttpMethod.GET;
    protected readonly path: string = '/paapi5';
    protected readonly target: string = 'com.amazon.paapi5.v1.ProductAdvertisingAPIv1';

    protected _signHelper: SignHelper;

    public constructor(
        protected readonly partnerTag: string,
        protected readonly partnerType: PartnerType,
        protected readonly accessKey: string,
        protected readonly secretKey: string,
        protected readonly host: Host,
        protected readonly region: Region,
    ) {
        this._signHelper = new SignHelper(accessKey, secretKey);
    }

    public async send(): Promise<ResponseType> {
        const timestamp = Date.now();
        const payload = this._buildPayload();

        const response = await axios(this._buildUrl(), {
            method: this.method,
            headers: this._buildHeaders(timestamp, payload),
            data: payload,
        });

        return response.data as ResponseType;
    }

    protected _buildUrl(): string {
        return `https://${this.host}${this.path}`;
    }

    protected _buildHeaders(timestamp: number, payload: CommonRequestPayload): CommonRequestHeaders {
        const commonHeaders = {
            'content-encoding': 'amz-1.0',
            'content-type': 'application/json; charset=utf-8',
            host: this.host,
            'x-amz-target': this.target,
            'x-amz-date': this._signHelper.toAmzDate(timestamp),
        };

        const authorization = this._signHelper.getAuthorizationHeader(
            this.path,
            this.method,
            payload,
            commonHeaders,
            this.region,
            this.service,
            timestamp,
        );

        return {
            ...commonHeaders,
            authorization: authorization,
        };
    }

    protected _buildPayload(): CommonRequestPayload {
        return {
            PartnerTag: this.partnerTag,
            PartnerType: this.partnerType,
        };
    }
}
