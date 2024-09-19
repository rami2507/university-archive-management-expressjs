const reportProblem = async (type, message) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://127.0.0.1:3000/api/v1/users/sendProblem",
      data: {
        type,
        message,
      },
    });
    if (res.data.status === "success") {
      alert("Your problem has been sent successfuly");
      window.setTimeout(() => {
        location.assign("/userDashboard");
      }, 1500);
    }
  } catch (err) {
    alert(err.response.data.message);
  }
};

// DOM ELEMENTS
const reportProblemForm = document.querySelector(".form3");

// EXECUTING

if (reportProblemForm) {
  reportProblemForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const type = document.getElementById("problemtype").value;
    const message = document.getElementById("message").value;
    reportProblem(type, message);
  });
}
