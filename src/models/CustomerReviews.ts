import { Resources } from "./types";

export interface CustomerReviews {
    Count?: string;
    StarRating?: string;
}

export type CustomerReviewsResource = Resources<CustomerReviews, 'CustomerReviews.'>;