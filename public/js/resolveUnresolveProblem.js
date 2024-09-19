const resolveProblem = async (id) => {
  const url = `http://127.0.0.1:3000/api/v1/users/resolveProblem/${id}`;

  await axios.patch(url);

  alert("Problem has been accepted successfuly");

  // Reload or redirect after successful deletion
  setTimeout(() => {
    location.assign("/problems");
  }, 800);
};

const unresolveProblem = async (id) => {
  const url = `http://127.0.0.1:3000/api/v1/users/unresolveProblem/${id}`;

  await axios.patch(url);

  alert("Problem has been unresolved!");

  // Reload or redirect after successful deletion
  setTimeout(() => {
    location.assign("/problems");
  }, 800);
};

const unresolveProblemButton = document.querySelector(".btn--delete");
const resolveProblemButton = document.querySelector(".btn--accept");

if (unresolveProblemButton) {
  const currentUrl = window.location.href;
  const problemID = currentUrl.split("/")[4];
  // Pass a function reference to the event listener
  unresolveProblemButton.addEventListener("click", () => {
    unresolveProblem(problemID);
  });
}

if (resolveProblemButton) {
  const currentUrl = window.location.href;
  const problemID = currentUrl.split("/")[4];
  // Pass a function reference to the event listener
  resolveProblemButton.addEventListener("click", () => {
    resolveProblem(problemID);
  });
}
