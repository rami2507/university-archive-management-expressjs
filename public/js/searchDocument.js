const searchDoc = async (searchData) => {
  try {
    console.log(searchData);
    const url = "http://127.0.0.1:3000/api/v1/users/search-documents";

    const res = await axios.post(url, searchData);
    alert(res.data.message);
    window.setTimeout(() => {
      location.assign(`/search-document/${res.data.document._id}`);
    }, 1500);
  } catch (err) {
    alert(err.response.data.message);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const searchDocumentForm = document.querySelector(".signup-form");

  if (searchDocumentForm) {
    searchDocumentForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const typededocument = document.getElementById("typededocument").value;
      const nom = document.getElementById("nom").value;
      const prenom = document.getElementById("prenom").value;
      const specialite = document.getElementById("specialite").value;
      const searchData = { typededocument, nom, prenom, specialite };
      searchDoc(searchData);
    });
  }
});
