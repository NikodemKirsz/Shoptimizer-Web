interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
}

interface SearchProduct extends Omit<Product,
  "category"
> {
  categoryId: number;
  categoryBreadcrumbs: string[];
}

export type { Product, SearchProduct };