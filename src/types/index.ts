export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Food {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: string;
  category: Category;
}

export interface PaginationData {
  total: number;
  pages: number;
  currentPage: number;
  limit: number;
}

export interface FoodsResponse {
  foods: Food[];
  pagination: PaginationData;
}
