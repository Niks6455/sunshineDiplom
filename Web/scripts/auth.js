document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('form');

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    const login = form.elements.login.value;
    const password = form.elements.password.value;

    if (login && password) {
      const userData = {
        login,
        password
      };
      fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
        .then(response => {
          if (response.status === 200) {
            return response.json(); 
          } else {
            throw new Error('Login failed');
          }
        })
        .then(data => {
          console.log(data)
          sessionStorage.setItem("accessToken", data.accessToken);
          sessionStorage.setItem("refreshToken", data.refreshToken);
          sessionStorage.setItem("userID", data.id);
          sessionStorage.setItem("userName", data.name); 
          sessionStorage.setItem("userSurname", data.surname);
          if (data.role === 2){
            window.location.href = 'http://127.0.0.1:5501/Web/Page/AdminPage.html';
          }else{
            window.location.href = 'http://127.0.0.1:5501/Web/Page/HomePage.html';
          }
        })
        .catch(error => {
          alert('Login failed: ' + error.message);
        });
    } else {
      alert('Please fill in all the form fields!');
    }
  });
});
