export type ImageType = 'Primary' | 'Variants';
export type ImageSize = 'Small' | 'Medium' | 'Large';

export interface ImageData {
    URL: string;
    Height: string;
    Width: string;
}

export type Images = {
    [K in ImageType]?: {
        [KK in ImageSize]?: ImageData;
    };
};

export type ImagesResource = `Images.${ImageType}.${ImageSize}`;
