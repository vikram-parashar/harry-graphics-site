export type RelationTypes = {
  Orders: {
    id: string;
    created_at: string;
    updated_at: string;
    status: string;
    cart: CartItemType[];
    note: string;
    order_number: string;
    user: RelationTypes['User'];
    address_line_1: string;
    address_line_2?: string;
    city: string;
    pincode: string;
    phone: string;
    tracking_link?: string;
    payment: string;
    total_amount: number;
  },
  Carousel: {
    id: string;
    image: string;
    title: string;
    points: string[];
    link: string;
  },
  Category: {
    id: string;
    name: string;
    thumbnail_image: string;
    created_at: string;
    updated_at: string;
    heading: string;
  },
  Product: {
    id: string;
    created_at: string;
    updated_at: string;
    name: string;
    price: number;
    min_quantity: number;
    image: string;
    unit: string;
    options: {
      [key: string]: { name: string, price: number }[]
    },
    categories: RelationTypes['Category'],
  },
  User: {
    id: string;
    email: string;
    name: string;
    created_at: string;
    updated_at: string;
    addresses: {
      address_line_1: string;
      address_line_2?: string;
      city: string;
      pincode: string;
    }[];
    phone: string;
  },
}
export type CartItemType = {
  product: RelationTypes['Product'];
  quantity: number;
  options: { [key: string]: string };
}
