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
        console.log(userData);
      } else {
        alert('Пожалуйста, заполните все поля формы!');
      }
    });
  });
  