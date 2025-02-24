import classNames from 'classnames';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import { useShop } from "../hooks/useShop";
import styles from "./products.module.css";
import { Product } from "../models/product";
import { Paginated } from "../models/api";
import { getProducts, deleteProduct } from '../api/products';
import { useState } from "react";
import { SortOrder } from "../models/utils";

const PAGE_SIZE = 3;

const DEFAULT_PAGINATION_STATE : Paginated<Product> = {
  first: 0,
  prev: 0,
  next: 0,
  last: 0,
  pages: 0,
  items: 0,
  data: []
}

export const Products = () => {
  const { addToCart } = useShop();

  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<'name' | 'price'>('name');
  const [orderBy, setOrderBy] = useState<SortOrder>('asc');
  
  const queryClient = useQueryClient();

  const { data = DEFAULT_PAGINATION_STATE, error, isLoading } = useQuery({
    queryFn: () => getProducts({
      page: currentPage,
      perPage: PAGE_SIZE,
      sort: [(orderBy === 'asc' ? '' : '-') + sortBy]
    }),
    queryKey: ['products', currentPage, sortBy, orderBy]
  });

  const { mutate: removeProduct } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      alert("Product Removed Successfully");
    }
  })

  const { data : products, prev, next, first, last, pages} = data;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={styles["products-container"]}>
      <h1 className={styles.title}>Products</h1>

      <div className={styles["sort-container"]}>
        <label htmlFor="sortBy">Sort By:</label>
        <select id="sortBy" value={sortBy} onChange={(e) => setSortBy(e.target.value as Exclude<keyof Product, 'id'>)}>
          <option value="name">Name</option>
          <option value="price">Price</option>
        </select>
        <label htmlFor="orderBy">Order By:</label>
        <select id="orderBy" value={orderBy} onChange={(e) => setOrderBy(e.target.value as SortOrder)}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <ul className={styles["products-list"]}>
        {products.map((product) => (
          <li key={product.id} className={styles["product-card"]}>
            <h2 className={styles["product-name"]}>{product.name} - ${product.price}</h2>
            <div className={styles["product-buttons"]}>
              <button className={styles.button} onClick={() => addToCart(product)}>Add to Cart</button>
              <button className={classNames(styles.button, styles["bg-red"])} onClick={() => removeProduct(product.id)}>Remove Product</button>
            </div>
          </li>
        ))}
      </ul>

      <div className={styles.pagination}>
        <button
          className={styles.button}
          onClick={() => setCurrentPage(prev ?? first)}
          disabled={prev === null}
        >
          Previous
        </button>
        <span className={styles["pagination-info"]}>
          Page {currentPage} of {pages}
        </span>
        <button
          className={styles.button}
          onClick={() => setCurrentPage(next ?? last)}
          disabled={next === null}
        >
          Next
        </button>
      </div>
    </div>
  );
};