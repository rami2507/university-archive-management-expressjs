const searchProf = async (data) => {
  try {
    const url = "http://127.0.0.1:3000/api/v1/users/search-prof";

    const res = await axios.post(url, data);
    console.log(res.data.message);
    alert(res.data.message);
    window.setTimeout(() => {
      location.assign(`/search-prof/${res.data.prof._id}`);
    }, 1500);
  } catch (err) {
    alert(err.response.data.message);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const searchProfForm = document.querySelector(".signup-form");

  if (searchProfForm) {
    searchProfForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = {
        nom: document.getElementById("profName").value,
      };
      searchProf(data);
    });
  }
});
