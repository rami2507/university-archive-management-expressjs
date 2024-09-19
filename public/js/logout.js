const logout = async () => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://127.0.0.1:3000/api/v1/users/logout",
    });
    if (res.data.status === "success") {
      alert("You are logged out successfuly");
      window.setTimeout(() => {
        location.assign("/login");
      }, 800);
    }
  } catch (err) {
    alert(err);
  }
};

// EXECUTING
const logoutButton = document.querySelector(".nav__el--logout");

if (logoutButton) {
  logoutButton.addEventListener("click", logout);
}
