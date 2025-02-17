import { useQuery } from "@tanstack/react-query";
import { useShop } from "../hooks/useShop";
import styles from "./products.module.css";
import { Product } from "../models/product";

export const Products = () => {
  const { addToCart } = useShop();
  const { data: products = [], error, isLoading } = useQuery<Product[]>({queryKey: ['products']});

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
    </div>
  );
};