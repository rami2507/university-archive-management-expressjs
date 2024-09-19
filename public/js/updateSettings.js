const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? 'http://127.0.0.1:4000/api/v2/user/updatePassword'
        : 'http://127.0.0.1:4000/api/v2/user/updateMe';
    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });
    if (res.data.status === 'success') {
      alert(`${type} Has Changed!`);
      window.setTimeout(() => {
        location.assign('/me');
      }, 500);
    }
  } catch (err) {
    alert(err.response.data.message);
  }
};

const userPasswordForm = document.querySelector('.form-user-password');
const userData = document.querySelector('.form-user-data');

if (userPasswordForm)
  userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );
  });

if (userData) {
  userData.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    updateSettings(form, 'data');
  });
}
