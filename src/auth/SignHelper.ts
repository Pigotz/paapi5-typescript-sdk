/* eslint-disable import/prefer-default-export */
import crypto from 'crypto';

import { Headers, HttpMethod, Payload } from '../http/types';
import { Region } from '../requests/CommonRequest';

export class SignHelper {
    public constructor(private readonly accessKey: string, private readonly secretKey: string) {}

    public getAuthorizationHeader(
        path: string,
        method: HttpMethod,
        payload: Payload,
        headers: Headers,
        region: Region,
        service: string,
        timestamp: number,
    ): string {
        const signedHeaders = this._createSignedHeaders(headers);

        const canonicalRequest = this._createCanonicalRequest(path, method, payload, headers);

        const stringToSign = this._createStringToSign(timestamp, region, service, canonicalRequest);

        const signature = this._createSignature(this.secretKey, timestamp, region, service, stringToSign);

        const authorizationHeader = this._createAuthorizationHeaders(
            timestamp,
            this.accessKey,
            region,
            service,
            signedHeaders,
            signature,
        );

        return authorizationHeader;
    }

    public toAmzDate(timestamp: number): string {
        return new Date(timestamp).toISOString().replace(/[:-]|\.\d{3}/g, '');
    }

    private _toTime(timestamp: number): string {
        return new Date(timestamp).toISOString().replace(/[:-]|\.\d{3}/g, '');
    }

    private _toDate(timestamp: number): string {
        return this._toTime(timestamp).substring(0, 8);
    }

    private _createAuthorizationHeaders(
        timestamp: number,
        accessKey: string,
        region: Region,
        service: string,
        signedHeaders: string,
        signature: string,
    ): string {
        const credentialScope = this._createCredentialScope(timestamp, region, service);

        return `AWS4-HMAC-SHA256 Credential=${accessKey}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;
    }

    private _createSignedHeaders(headers: Headers): string {
        return Object.keys(headers)
            .sort()
            .map((name) => name.toLowerCase().trim())
            .join(';');
    }

    private _createCanonicalRequest(path: string, method: HttpMethod, payload: Payload, headers: Headers): string {
        const jsonPayload = JSON.stringify(payload);

        return [
            method.toUpperCase(),
            path,
            '', // Query string
            this._createCanonicalHeaders(headers),
            this._createSignedHeaders(headers),
            crypto.createHash('sha256').update(jsonPayload, 'utf8').digest('hex'),
        ].join('\n');
    }

    private _createCanonicalHeaders(headers: Headers): string {
        return Object.keys(headers)
            .sort()
            .map((key) => `${key.toLowerCase().trim()}:${headers[key].toString().trim()}\n`)
            .join('');
    }

    private _createStringToSign(timestamp: number, region: Region, service: string, request: string): string {
        return [
            'AWS4-HMAC-SHA256',
            this._toTime(timestamp),
            this._createCredentialScope(timestamp, region, service),
            crypto.createHash('sha256').update(request, 'utf8').digest('hex'),
        ].join('\n');
    }

    private _createCredentialScope(timestamp: number, region: Region, service: string): string {
        return [this._toDate(timestamp), region, service, 'aws4_request'].join('/');
    }

    private _createSignature(
        secret: string,
        timestamp: number,
        region: Region,
        service: string,
        stringToSign: string,
    ): string {
        let signature = crypto
            .createHmac('sha256', Buffer.from(`AWS4${secret}`, 'utf-8'))
            .update(this._toDate(timestamp));
        signature = crypto.createHmac('sha256', signature.digest()).update(region);
        signature = crypto.createHmac('sha256', signature.digest()).update(service);
        signature = crypto.createHmac('sha256', signature.digest()).update('aws4_request');
        signature = crypto.createHmac('sha256', signature.digest()).update(stringToSign);

        return signature.digest('hex');
    }
}
