import Category from "../categories/Category";

export default interface ProductResponse {
    id: number;
    images: string[];
    title: string;
    price: number;
    description: string;
    category : Category;
}