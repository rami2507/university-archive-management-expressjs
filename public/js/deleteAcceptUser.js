const deleteUser = async (id) => {
  const url = `http://127.0.0.1:3000/api/v1/users/deleteuser/${id}`;

  await axios.delete(url);

  alert("User has been deleted successfully");

  // Reload or redirect after successful deletion
  setTimeout(() => {
    location.assign("/manage-users/");
  }, 800);
};

const acceptUser = async (id) => {
  const url = `http://127.0.0.1:3000/api/v1/users/acceptUser/${id}`;

  await axios.patch(url);

  alert("User has been accepted successfuly");

  // Reload or redirect after successful deletion
  setTimeout(() => {
    location.assign("/manage-users/");
  }, 800);
};

const deleteUserButton = document.querySelector(".btn--delete");
const acceptUserButton = document.querySelector(".btn--accept");

if (deleteUserButton) {
  const currentUrl = window.location.href;
  const userID = currentUrl.split("/")[5];
  // Pass a function reference to the event listener
  deleteUserButton.addEventListener("click", () => {
    deleteUser(userID);
  });
}

if (acceptUserButton) {
  const currentUrl = window.location.href;
  const userID = currentUrl.split("/")[5];
  // Pass a function reference to the event listener
  acceptUserButton.addEventListener("click", () => {
    acceptUser(userID);
  });
}
