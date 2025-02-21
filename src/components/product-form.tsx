import classNames from "classnames";
import { useForm } from "react-hook-form";
import styles from "./product-form.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProduct } from "../api/products";
import { useNavigate } from "react-router";

type ProductFormFields = {
  name: string;
  price: number;
};

export const ProductForm = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: createProduct } = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      alert("Product Added Successfully");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormFields>();

  const onSubmit = (data: ProductFormFields) => {
    createProduct(data);
    navigate("/");
  };

  return (
    <div className={styles.card}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles["product-form"]}
      >
        <div className={styles["form-group"]}>
          <label className={styles.label} htmlFor="name">
            Product Name
          </label>
          <input
            className={classNames(styles.input, {
              [styles.error]: !!errors.name,
            })}
            id="name"
            {...register("name", { required: "Please Enter Product Name" })}
          />
          {errors.name && (
            <span className={styles["error-message"]}>
              {errors.name.message}
            </span>
          )}
        </div>
        <div className={styles["form-group"]}>
          <label className={styles.label} htmlFor="price">
            Price
          </label>
          <input
            className={classNames(styles.input, {
              [styles.error]: !!errors.name,
            })}
            id="price"
            type="number"
            min={0}
            {...register("price", {
              required: "Please Enter Product Price",
              min: { value: 0, message: "Price Must be a positive number" },
            })}
          />
          {errors.price && (
            <span className={styles["error-message"]}>
              {errors.price.message}
            </span>
          )}
        </div>
        <button type="submit" className={styles["submit-button"]}>
          Add Product
        </button>
      </form>
    </div>
  );
};
