const login = async (nomdutilisateur, motdepass) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://127.0.0.1:3000/api/v1/users/login",
      data: {
        nomdutilisateur,
        motdepass,
      },
    });
    if (
      res.data.status === "success" &&
      (res.data.data.user.typedecompte === "etudiant" ||
        res.data.data.user.typedecompte === "enseignant")
    ) {
      alert("Hi User, You are logged in successfully");
      window.setTimeout(() => {
        location.assign("/userDashboard");
      }, 1500);
    } else {
      alert(res.data.message);
    }
  } catch (err) {
    alert(err.response.data.message);
  }
};

const loginAdmin = async (nomdutilisateur, motdepass) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://127.0.0.1:3000/api/v1/users/login",
      data: {
        nomdutilisateur,
        motdepass,
      },
    });
    console.log(res);
    if (
      res.data.status === "success" &&
      res.data.data.user.typedecompte === "admin"
    ) {
      alert("Hi Admin, You are logged in successfuly");
      window.setTimeout(() => {
        location.assign("/adminDashboard");
      }, 1500);
    } else {
      alert("This is only for admins go to /login for login as a user");
    }
  } catch (err) {
    alert(err.response.data.message);
  }
};

// DOM ELEMENTS
const loginForm = document.querySelector(".form");
const adminForm = document.querySelector(".adminForm");

// EXECUTING

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const nomdutilisateur = document.getElementById("nomdutilisateur").value;
    const motdepass = document.getElementById("motdepass").value;
    console.log(nomdutilisateur, motdepass);
    login(nomdutilisateur, motdepass);
  });
}

if (adminForm) {
  adminForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const nomdutilisateur = document.getElementById("nomdutilisateur").value;
    const motdepass = document.getElementById("motdepass").value;
    console.log(nomdutilisateur, motdepass);
    loginAdmin(nomdutilisateur, motdepass);
  });
}
// console.log('hello from login js');
