const sendDemandAdministratif = async (typeDeDocument, data) => {
  try {
    const res = await axios({
      method: "POST",
      url: `http://127.0.0.1:3000/api/v1/users/sendAdministratifDemand/${typeDeDocument}`,
      data,
    });
    if (res.data.status === "success") {
      alert("Your demand has been sent successfully");
      window.setTimeout(() => {
        location.assign("/user/demands/send-new-demand");
      }, 1500);
    }
  } catch (err) {
    console.error(err.response.data.message || err.message);
    // Display an error message to the user here
  }
};

// DOM ELEMENTS
const diplomForm = document.querySelector(".formDiplom");
const certificatScolaireForm = document.querySelector(
  ".formCertificatScolaire"
);
const affectationForm = document.querySelector(".formAffectation");

// DOCUMENT TYPE
const typeDeDocument = window.location.href.split("/")[7];

if (diplomForm) {
  diplomForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const nom = document.getElementById("nom").value;
    const prenom = document.getElementById("prenom").value;
    const specialite = document.getElementById("specialite").value;

    // Add client-side validation here (optional)

    const data = { nom, prenom, specialite };

    try {
      await sendDemandAdministratif(typeDeDocument, data);
    } catch (error) {
      console.error(error);
    }
  });
}

if (certificatScolaireForm) {
  certificatScolaireForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const nom = document.getElementById("nom").value;
    const prenom = document.getElementById("prenom").value;
    const specialite = document.getElementById("specialite").value;
    const matricule = document.getElementById("matricule").value;

    const data = { nom, prenom, specialite, matricule };

    try {
      await sendDemandAdministratif(typeDeDocument, data);
    } catch (error) {
      console.error(error);
    }
  });
}

if (affectationForm) {
  affectationForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const nom = document.getElementById("nom").value;
    const prenom = document.getElementById("prenom").value;
    const grade = document.getElementById("grade").value;

    const data = { nom, prenom, grade };

    try {
      await sendDemandAdministratif(typeDeDocument, data);
    } catch (error) {
      console.error(error);
    }
  });
}
