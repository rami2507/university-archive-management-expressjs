/* eslint-disable */

const signup = async (
  nom,
  prenom,
  datedenaissance,
  email,
  numerodetelephone,
  nomdutilisateur,
  motdepass,
  typedecompte
) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://127.0.0.1:3000/api/v1/users/signup",
      data: {
        nom,
        prenom,
        datedenaissance,
        email,
        numerodetelephone,
        nomdutilisateur,
        motdepass,
        typedecompte,
      },
    });
    if (res.data.status === "success") {
      alert("You are successfuly signed up");
      window.setTimeout(() => {
        location.assign("/login");
      }, 1500);
    }
  } catch (err) {
    alert(err.response.data.message);
  }
};

// DOM ELEMENTS
const signupForm = document.querySelector(".form2");

// EXECUTING

if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const nom = document.getElementById("nom").value;
    const prenom = document.getElementById("prenom").value;
    const datedenaissance = document.getElementById("datedenaissance").value;
    const email = document.getElementById("email").value;
    const numerodetelephone =
      document.getElementById("numerodetelephone").value;
    const nomdutilisateur = document.getElementById("nomdutilisateur").value;
    const motdepass = document.getElementById("motdepass").value;
    const typedecompte = document.getElementById("typedecompte").value;
    console.log(nomdutilisateur);
    signup(
      nom,
      prenom,
      datedenaissance,
      email,
      numerodetelephone,
      nomdutilisateur,
      motdepass,
      typedecompte
    );
  });
}
