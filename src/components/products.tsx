import { useShop } from "../hooks/useShop";
import styles from "./products.module.css";

export const Products = () => {
  const { products, addToCart } = useShop();

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