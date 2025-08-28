export type RelationTypes = {
  Orders: {
    id: string;
    created_at: string;
    updated_at: string;
    user_id: string;
    users: RelationTypes['User'];
    cart: CartItemType[];
    note: string;
    payment: string;
    status: string;
    order_number: number;
    tracking_link: string;
    address: AddressType;
    total_amount: number;
  },
  Carousel: {
    id?: string;
    image?: string;
    title?: string;
    points?: string[];
    link?: string;
  },
  Category: {
    id?: string;
    name?: string;
    thumbnail_image?: string;
    created_at?: string;
    updated_at?: string;
    heading?: string;
  },
  Product: {
    id?: string;
    created_at?: string;
    updated_at?: string;
    name: string;
    price: number;
    min_quantity?: number;
    image?: string;
    unit?: string;
    options?: {
      [key: string]: { name: string, price: number }[]
    },
    categories?: RelationTypes['Category'],
  },
  User: {
    id?: string;
    email?: string;
    name?: string;
    created_at?: string;
    updated_at?: string;
    addresses: AddressType[];
    phone?: string;
    is_admin?: boolean;
  },
}
export type CartItemType = {
  product: RelationTypes['Product'];
  quantity: number;
  options: { [key: string]: string };
}
export type AddressType = {
  address_line_1: string;
  address_line_2?: string;
  city: string;
  pincode: string;
}
