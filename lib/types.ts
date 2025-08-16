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
    header_image?: string | null;
    header_image_mobile?: string | null;
    created_at: string;
    updated_at: string;
    heading: string;
  },
}
