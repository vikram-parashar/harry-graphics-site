export type RelationTypes = {
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
  }
}
export type CartItemType = {
  product: RelationTypes['Product'];
  quantity: number;
  options: { [key: string]: string };
}
