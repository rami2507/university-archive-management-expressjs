// FUNCTION DECLARATION
const deleteArchive = async (archiveID) => {
  try {
    const res = await axios({
      method: "DELETE",
      url: `http://127.0.0.1:3000/api/v1/users/deleteArchive/${archiveID}`,
      data: {
        archiveID,
      },
    });
    alert("The document has been deleted successfuly");
    window.setTimeout(() => {
      location.assign("/manage-archives/administratif-archives");
    }, 1500);
  } catch (err) {
    console.log(err.response.data.message);
  }
};

// DOM ELEMENTS
const deleteArchiveBtn = document.querySelector(".btn--delete");

// EXECUTING

if (deleteArchiveBtn) {
  const archiveID = window.location.href.split("/")[6];
  deleteArchiveBtn.addEventListener("click", (e) => {
    e.preventDefault();
    deleteArchive(archiveID);
  });
}
