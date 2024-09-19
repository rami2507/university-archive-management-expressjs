console.log("JS FILE LINKED");

const acceptDemand = async (id) => {
  const url = `http://127.0.0.1:3000/api/v1/users/acceptDemand/${id}`;

  const res = await axios.patch(url);

  alert(res.data.message);

  // Reload or redirect after successful deletion
  setTimeout(() => {
    location.assign("/manage-demands/");
  }, 800);
};

const deleteDemand = async (id) => {
  const url = `http://127.0.0.1:3000/api/v1/users/declineDemand/${id}`;

  await axios.patch(url);

  alert("Demand has been declined successfuly");

  // Reload or redirect after successful deletion
  setTimeout(() => {
    location.assign("/manage-demands/archive/");
  }, 800);
};

const deleteDemandButton = document.querySelector(".btn--delete");
const acceptDemandButton = document.querySelector(".btn--accept");

if (deleteDemandButton) {
  const currentUrl = window.location.href;
  const demandID = currentUrl.split("/")[5];
  // Pass a function reference to the event listener
  deleteDemandButton.addEventListener("click", () => {
    deleteDemand(demandID);
  });
}

if (acceptDemandButton) {
  const currentUrl = window.location.href;
  const demandID = currentUrl.split("/")[5];
  // Pass a function reference to the event listener
  acceptDemandButton.addEventListener("click", () => {
    acceptDemand(demandID);
  });
}
