const sendDocumentArchive = async (data, typeDeDocument) => {
  try {
    const formData = new FormData();
    formData.append("nommatiere", data.nommatiere);
    formData.append("specialite", data.specialite);
    formData.append("annee", data.annee);
    formData.append("photo", data.photo);

    const res = await axios.post(
      `http://127.0.0.1:3000/api/v1/users/sendDemand/archive/${typeDeDocument}`,
      formData
    );

    if (res.data.status === "success") {
      alert("demand sent");
    }
  } catch (err) {
    console.log(err.response.data.message);
  }
};

const demandArchiveDocumentForm = document.querySelector(".archiveDemand");

if (demandArchiveDocumentForm) {
  demandArchiveDocumentForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const typeDeDocument = document.getElementById("typeDeDocument").value;
    const nommatiere = document.getElementById("nommatiere").value;
    const specialite = document.getElementById("specialite").value;
    const annee = document.getElementById("annee").value;
    const photo = document.getElementById("photo").files[0];

    const data = { nommatiere, specialite, annee, photo };

    await sendDocumentArchive(data, typeDeDocument);
  });
}
