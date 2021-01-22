# paapi5-typescript-sdk

*Unofficial* TypeScript SDK for Product Advertising API 5.0

## Installation

In order to install this SDK, you just have to run you well-known `npm` or `yarn` scripts:

```shell
npm i -S paapi5-typescript-sdk
```

Or

```shell
yarn add paapi5-typescript-sdk
```

And there you go! Enjoy 😎

## API

Everything is exported from the SDK: requests' classes, models, utility types, helper and so on..

If you want to import _everything_

```typescript
import * as SDK from 'paapi5-typescript-sdk';
```

And use what you need later

```typescript
const request = new SDK.SearchItemsRequest(/* ... */);
```

You can refer to the [Amazon Product Advertising API 5.0](https://webservices.amazon.com/paapi5/documentation/) for further details about every request

### Auth

In order to validate all the requests against the APIs, I've implemented almost from scratch the [AWS V4 signing process](https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html), creating the `SignHelper` class.

This is intended for interal use, but if you want to use it for other purposes, here you can find an example:

```typescript
import { HttpMethod, SignHelper, Region } from 'paapi5-typescript-sdk'

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

const header = signHelper.getAuthorizationHeader(path, method, {}, headers, Region.ITALY, service, timestamp);

// 'AWS4-HMAC-SHA256 Credential=accessKey/20201231/eu-west-1/ProductAdvertisingAPI/aws4_request, SignedHeaders=content-encoding;content-type;host;x-amz-date;x-amz-target, Signature=ba741bfb87f9bf3b9b343d72e4f76dc9f169f2e86a047423d783a2169f03c595'
```

### Http

This folder only contains some types, interfaces and enums

### Models (resources)

This folder only contains some types, interfaces and enums

[Link to Amazon documentation](https://webservices.amazon.com/paapi5/documentation/resources.html)

### Requests

Here you can find all the classes you need in order to communicate with the APIs

#### `CommonRequest`

This is intended to be just a parent class to be extended by all the other specific classes.

Its only purposes are:
- Instantiate a `SignHelper` for internal use
- Prepare all the request's parameters including the URL, the headers and the payload
- Abstracts away the `send()` method so that all the sub-classes don't need to implement it


Example

```typescript
import { CommonRequest, PartnerType, Host, Region } from 'paapi5-typescript-sdk'

const commonRequest = new CommonRequest(
    'partnerTag',
    PartnerType.ASSOCIATES,
    'accessKey',
    'secretKey',
    Host.Italy,
    Region.Italy
);

// Not an real request, just an example
const data = await commonRequest.send();
```

#### `GetBrowseNodesRequest`

Amazon documentation [here](https://webservices.amazon.com/paapi5/documentation/getbrowsenodes.html#getbrowsenodes)

Example

```typescript
import { GetBrowseNodesRequest, PartnerType, Host, Region } from 'paapi5-typescript-sdk'

const request = new GetBrowseNodesRequest(
    { /* parameters */ }
    'partnerTag',
    PartnerType.ASSOCIATES,
    'accessKey',
    'secretKey',
    Host.Italy,
    Region.Italy
);

const data = await request.send();
```

#### `GetItemsRequest`

Amazon documentation [here](https://webservices.amazon.com/paapi5/documentation/get-items.html#getitems)

Example

```typescript
import { GetItemsRequest, PartnerType, Host, Region } from 'paapi5-typescript-sdk'

const request = new GetItemsRequest(
    { /* parameters */ }
    'partnerTag',
    PartnerType.ASSOCIATES,
    'accessKey',
    'secretKey',
    Host.Italy,
    Region.Italy
);

const data = await request.send();
```

#### `GetVariationsRequest`

Amazon documentation [here](https://webservices.amazon.com/paapi5/documentation/get-variations.html#getvariations)

Example

```typescript
import { GetVariationsRequest, PartnerType, Host, Region } from 'paapi5-typescript-sdk'

const request = new GetVariationsRequest(
    { /* parameters */ }
    'partnerTag',
    PartnerType.ASSOCIATES,
    'accessKey',
    'secretKey',
    Host.Italy,
    Region.Italy
);

const data = await request.send();
```

#### `SearchItemsRequest`

Amazon documentation [here](https://webservices.amazon.com/paapi5/documentation/search-items.html#searchitems)

Example

```typescript
import { SearchItemsRequest, PartnerType, Host, Region } from 'paapi5-typescript-sdk'

const request = new SearchItemsRequest(
    { /* parameters */ }
    'partnerTag',
    PartnerType.ASSOCIATES,
    'accessKey',
    'secretKey',
    Host.Italy,
    Region.Italy
);

const data = await request.send();
```
