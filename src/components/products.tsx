import { useQuery } from "@tanstack/react-query";
import { useShop } from "../hooks/useShop";
import styles from "./products.module.css";
import { Product } from "../models/product";
import { Paginated } from "../models/api";
import {getProductsByPage} from '../api/products';
import { useState } from "react";

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
  
  const { data = DEFAULT_PAGINATION_STATE, error, isLoading } = useQuery<Paginated<Product>>({
    queryFn: () => getProductsByPage(currentPage),
    queryKey: ['products', currentPage]
  });

  const { data : products, prev, next, last, pages} = data;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={styles["products-container"]}>
      <h1 className={styles["title"]}>Products</h1>
      <ul className={styles["products-list"]}>
        {products.map((product) => (
          <li key={product.id} className={styles["product-card"]}>
            <h2 className={styles["product-name"]}>{product.name} - ${product.price}</h2>
            <button className={styles.button} onClick={() => addToCart(product)}>Add to Cart</button>
          </li>
        ))}
      </ul>
      <div className={styles["pagination"]}>
        <button
          className={styles.button}
          onClick={() => setCurrentPage(prev)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className={styles["pagination-info"]}>
          Page {currentPage} of {pages}
        </span>
        <button
          className={styles.button}
          onClick={() => setCurrentPage(next)}
          disabled={currentPage === last}
        >
          Next
        </button>
      </div>
    </div>
  );
};