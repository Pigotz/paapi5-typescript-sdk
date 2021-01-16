import { HttpMethod } from '../http/types';
import { Region } from '../requests/CommonRequest';
import { SignHelper } from './SignHelper';

describe('SignHelper', () => {
    const timestamp = 1609426121130;

    const path = '/paapi5/getbrowsenodes';
    const method = HttpMethod.POST;
    const service = 'ProductAdvertisingAPI';

    const accessKey = 'accessKey';
    const secretKey = 'secretKey';

    const signHelper = new SignHelper(accessKey, secretKey);

    const headers = {
        host: 'webservices.amazon.it',
        'x-amz-target': 'com.amazon.paapi5.v1.ProductAdvertisingAPIv1.GetBrowseNodes',
        'x-amz-date': signHelper.toAmzDate(timestamp),
        'content-encoding': 'amz-1.0',
        'content-type': 'application/json; charset=utf-8',
    };

    it('should create a valid authorization header', () => {
        const expectedHeader =
            'AWS4-HMAC-SHA256 Credential=accessKey/20201231/eu-west-1/ProductAdvertisingAPI/aws4_request, SignedHeaders=content-encoding;content-type;host;x-amz-date;x-amz-target, Signature=ba741bfb87f9bf3b9b343d72e4f76dc9f169f2e86a047423d783a2169f03c595';

        const header = signHelper.getAuthorizationHeader(path, method, {}, headers, Region.ITALY, service, timestamp);

        expect(header).toEqual(expectedHeader);
    });
});
