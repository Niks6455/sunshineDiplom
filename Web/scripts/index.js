//! Важные штучки
const id = sessionStorage.getItem("userID");
const accessToken = sessionStorage.getItem("accessToken");
console.log("userID", id);
console.log('accessToken', accessToken)


//! Слайдер
let index = 0; 
const slides = document.querySelectorAll('.about_flex-item'); 
const dotes = document.querySelectorAll('.dot_circ');
function showSlide(i) {
    slides.forEach(slide => slide.classList.remove('active')); 
    slides[i].classList.add('active');
    dotes.forEach(dote => dote.classList.remove('active'));
    dotes[i].classList.add('active')
}

function nextSlide() {
    index++;
    if (index >= slides.length) index = 0; 
    showSlide(index);
}

function prevSlide() {
    index--;
    if (index < 0) index = slides.length - 1; 
    showSlide(index);
}

document.querySelector('.btn_next').addEventListener('click', nextSlide);
document.querySelector('.btn_prev').addEventListener('click', prevSlide);

showSlide(index);



//!список
let questionHeaders = document.querySelectorAll('.question_h3'); 
questionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        if(header.classList.contains("close")){
            header.classList.remove('close');
            header.classList.add('open');
        }else{
            header.classList.add('close');
            header.classList.remove('open');
        }

    });
});


//! Анимации
const elements = document.querySelectorAll('#anim');
function checkScroll() {
  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    if (elementPosition < window.innerHeight) {
      element.classList.add('animation');
    }
  });
}

window.addEventListener('load', checkScroll);
window.addEventListener('scroll', checkScroll);

//!Плавный скролл
document.querySelectorAll('.jscorLink').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const href = this.getAttribute('href');
      const targetElement = document.querySelector(href);
      if ((window.innerWidth < 930) && (href == "#room")){
        console.log("z otrabotal")
        const offset = 1200;
        window.scrollTo({
            top: offset,
            behavior: 'smooth'
          });
      }
      if ((window.innerWidth > 930) && (href == "#room")){
        console.log("z otrabotal")
        const offset = 900;
        window.scrollTo({
            top: offset,
            behavior: 'smooth'
          });
      }
      if(href == "#top"){
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
      }  if(href == "#portfolio"){
        const offset = targetElement.offsetTop - 150;
        window.scrollTo({
            top: offset,
            behavior: 'smooth'
          });
      }
      else{
        const offset = targetElement.offsetTop - 50;
        window.scrollTo({
          top: offset,
          behavior: 'smooth'
        });
      }
    });
  });

  //!PopUp
  const request_btns = document.querySelectorAll(".request_btn");
  const PopUp = document.querySelector(".PopUp");
  const close_Pop_button = document.querySelector(".close_Pop_button");
  request_btns.forEach(request_btn => {
    request_btn.addEventListener("click", () => {
      PopUp.classList.add("active");
    });
  });
  
  close_Pop_button.addEventListener("click", () => {
    PopUp.classList.remove("active")
  })

  //!Форма

const form = document.querySelector('form');
const submitBtn = document.querySelector('button[type="submit"]');

submitBtn.addEventListener('click', (event) => {
  event.preventDefault();

  const phoneNumber = form.querySelector('input[name="number"]').value;

    //валидации формы
    const phoneRegex = /^\+?\d{10,14}$/;
    if (!phoneRegex.test(phoneNumber)) {
        alert('Пожалуйста, введите корректный номер телефона.');
        return; 
    }

  //отправка формы
  const formDatadata = {
    phoneNumber: phoneNumber
  }
  console.log(JSON.stringify(formDatadata))
  fetch('http://localhost:3000/order/createOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${accessToken}`,
        },
        body: JSON.stringify(formDatadata),
      })
        .then(response => {
          if (response.status === 200) {
           alert("Ваша заявка принята, в ближайшее время с вами свяжется наш сотрудник!")
           document.querySelector(".PopUp").classList.remove("active");
          } 
        })
       
        .catch(error => {
          alert('Ошибка: ' + error.message);
        });
});


//!бургер меню 
const burger_nav = document.querySelector(".burger_nav");
const burger = document.querySelector(".burger");
const list__header = document.querySelector(".list_boorger_header");
burger_nav.addEventListener("click", () =>{
    list__header.classList.contains("active") ? list__header.classList.remove("active") : list__header.classList.add("active")
    burger.classList.contains("active") ? burger.classList.remove("active") : burger.classList.add("active")

})





    