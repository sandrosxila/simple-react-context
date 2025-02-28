import { useState } from "react"

export const useModal = () => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState<string | undefined>(undefined);

  const openModal = (id?: string) => {
    setOpen(true);
    setId(id);
  }

  const closeModal = () => {
    setOpen(false);
  }

  return {id, open, openModal, closeModal};
}