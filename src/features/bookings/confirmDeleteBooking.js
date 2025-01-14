import { confirmDelete } from "../../utils/confirmDelete";

export const confirmDeleteBooking = (id, deletingFunc, navigate) => {
  confirmDelete().then((res) => {
    if (res.isConfirmed) {
      deletingFunc(id);

      if (navigate) {
        navigate(-1);
      }
    }
  });
};
