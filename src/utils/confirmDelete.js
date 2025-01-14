import Swal from "sweetalert2";

export const confirmDelete = async () => {
  const confirmResult = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",

    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleted!",
        text: "Your cabin has been deleted.",
        icon: "success",
      });
    }
    return result;
  });

  return confirmResult;
};
