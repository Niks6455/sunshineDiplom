
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
  
    form.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const surname = form.elements.surname.value;
      const name = form.elements.name.value;
      const patronymic = form.elements.patronymic.value;
      const login = form.elements.login.value;
      const password = form.elements.password.value;
      const repeatPassword = form.elements.repeatPassword.value;
  
      if (surname && name && patronymic && login && password && repeatPassword) {
        if (password === repeatPassword) {
          const userData = {
            surname,
            name,
            patronymic,
            login,
            password
          };
          fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
          }).then(response => {
              if (response.status === 200) {
                return response.json(); 
              } else {
                throw new Error('Login failed');
              }
            }).then(data => {
              sessionStorage.setItem("accessToken", data.accessToken);
              sessionStorage.setItem("refreshToken", data.refreshToken);
              sessionStorage.setItem("userID", data.id);
              window.location.href = 'http://127.0.0.1:5501/Web/Page/HomePage.html';
            }).catch(error => {
              alert('Ошибка при регистрации: ' + error.message);
            });          
        } else {
          alert('Пароли не совпадают!');
        }
      } else {
        alert('Пожалуйста заполните все поля формы!');
      }
    });
  });

