import { createPortal } from "react-dom";
import styles from "./modal.module.css";

type ModalProps = {
  open: boolean;
  title: string;
  content: string;
  onClose: () => void;
  onSubmit?: () => void;
}

export const Modal = ({open, title, content, onClose, onSubmit} : ModalProps) => {

  const onYesClick = () => {
    if(onSubmit){
      onSubmit();
      onClose();
    }
  }

  return createPortal(
    <dialog open={open} className={styles.dialog}>
      <h2>
        {title}  
      </h2>

      <div>
        <p>
          {content}
        </p>
      </div>

      <div className={styles.footer}>
        <button className={styles["no-btn"]} onClick={onClose}>
          No
        </button>
        {
          onSubmit && (
            <button className={styles["yes-btn"]} onClick={onYesClick}> 
              Yes
            </button>
          )
        }
      </div>
    </dialog>,
    document.getElementById("modal")!
  )
}