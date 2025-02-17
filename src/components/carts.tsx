import { useShop } from "../hooks/useShop";
import styles from "./carts.module.css";

export const CartItems = () => {
  const {cart, removeFromCart} = useShop();

  return (
    <div className={styles["cart-container"]}>
      <h2 className={styles["cart-title"]}>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className={styles["cart-empty"]}>Your cart is empty.</p>
      ) : (
        <ul className={styles["cart-list"]}>
          {cart.map((item) => (
            <li key={item.id} className={styles["cart-item"]}>
              <span className={styles["cart-item-name"]}>{item.name}</span>
              <span className={styles["cart-item-price"]}>${item.price}</span>
              <button
                className={styles["cart-remove-button"]}
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};