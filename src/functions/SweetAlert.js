import Swal from "sweetalert2";

// Styling for popup
const popupStyle = (popup) => {
  popup.style.borderRadius = "20px";
  popup.style.backgroundColor = "white";
  popup.style.padding = "20px";
  popup.style.width = "400px";
  popup.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.1)";
};

// Styling for buttons
const buttonStyle = (button) => {
  button.style.border = "2px solid grey";
  button.style.backgroundColor = "var(--title-txt)";
  button.style.color = "black";
  button.style.borderRadius = "15px";
  button.style.textAlign = "center";
  button.style.whiteSpace = "nowrap";
  button.style.padding = "1vh 1vw";
  button.style.fontWeight = "bold";
  button.style.textDecoration = "none";
  button.style.margin = "10px 5px";
  button.style.width = "120px";
};

function SweetAlert(text, icon) {
  Swal.fire({
    text: text,
    icon: icon,
    customClass: {
      confirmButton: "custom-button",
    },
    buttonsStyling: false, // Disable default SweetAlert2 button styles
    didRender: () => {
      // Apply inline styles manually after rendering for the popup
      const popup = document.querySelector(".swal2-popup");
      if (popup) {
        popupStyle(popup);
      }
      // Apply inline styles for the confirm button
      const confirmButton = document.querySelector(".custom-button");
      if (confirmButton) {
        buttonStyle(confirmButton);
      }
    },
  });
}

function SweetConfirm(text, label, confirmCallback) {
  Swal.fire({
    text: text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: label,
    customClass: {
      confirmButton: "custom-confirm-button",
      cancelButton: "custom-cancel-button",
    },
    buttonsStyling: false, // Disable default SweetAlert2 button styles
    didRender: () => {
      // Apply inline styles manually after rendering for the popup
      const popup = document.querySelector(".swal2-popup");
      if (popup) {
        popupStyle(popup);
      }
      // Apply inline styles for the confirm button
      const confirmButton = document.querySelector(".custom-confirm-button");
      if (confirmButton) {
        buttonStyle(confirmButton);
      }
      // Apply inline styles for the cancel button
      const cancelButton = document.querySelector(".custom-cancel-button");
      if (cancelButton) {
        buttonStyle(cancelButton);
      }
    },
  }).then((result) => {
    if (result.isConfirmed) {
      confirmCallback();
    }
  });
}

export { SweetAlert, SweetConfirm };
