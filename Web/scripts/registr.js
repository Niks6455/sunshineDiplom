document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
  
    form.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const surname = form.elements.surname.value;
      const name = form.elements.name.value;
      const patronumic = form.elements.patronumic.value;
      const login = form.elements.login.value;
      const password = form.elements.password.value;
      const repeatPassword = form.elements.repeatPassword.value;
  
      if (surname && name && patronumic && login && password && repeatPassword) {
        if (password === repeatPassword) {
          const userData = {
            surname,
            name,
            patronumic,
            login,
            password
          };
          console.log(userData);
        } else {
          alert('Пароли не совпадают!');
        }
      } else {
        alert('Пожалуйста заполните все поля формы!');
      }
    });
  });
  