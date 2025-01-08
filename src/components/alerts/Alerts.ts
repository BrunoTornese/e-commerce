import Swal from "sweetalert2";

export const showSuccessAlert = (message: string) => {
  Swal.fire({
    icon: "success",
    title: "Success!",
    text: message || "The operation was completed successfully.",
  });
};

export const showErrorAlert = (message: string) => {
  Swal.fire({
    icon: "error",
    title: "Error!",
    text: message || "The operation failed.",
  });
};

export const showConfirmAlert = (message: string) => {
  Swal.fire({
    title: "Are you sure?",
    text: message,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("The operation was successful!");
    } else {
      Swal.fire("The operation was cancelled!");
    }
  });
};
