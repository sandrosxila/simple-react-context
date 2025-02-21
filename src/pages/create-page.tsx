import { ProductForm } from '../components/product-form'
import styles from './create-page.module.css'

export const CreatePage = () => {
  return (
    <div className={styles.container}>
      <ProductForm />
    </div>
  )
}
