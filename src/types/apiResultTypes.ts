export interface ImageTypes {
  listing_image_id: number;
  listing_id: number;
  url_75x75: string;
  url_170x135: string;
  url_570xN: string;
  url_fullxfull: string;
  full_height: number;
  full_width: number;
}

export interface ShopTypes {
  shop_id: number;
  shop_name: string;
  title: string;
  icon_url_fullxfull: string;
}

export interface ProductOptions {
    title: string;
    description_1: string;
    description_2: string;
    description_3: string;
    description_4: string;
}

export interface ApiResults {
  listing_id: number;
  title: string;
  description: string;
  price: number;
  category_path: [string];
  Images: [ImageTypes];
  Shop: ShopTypes;
  product_options: {
    option_1: ProductOptions,
    option_2: ProductOptions,
    option_3: ProductOptions,
  };
}
