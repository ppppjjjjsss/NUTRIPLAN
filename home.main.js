// Swiper 
var swiper = new Swiper(".home", {
    spaceBetween: 30,
    centeredSlides: true,
    
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
});             

Letmenu = document.querySelector('#menu-icon')
Letnavbar = document.querySelector('.navbar')

menu.onclick = () => {
  menu.classlist.toggle ('bx-x');
  navbar.classlist.toggle ('active');
}

window.onscroll =() => {
  menu.classlist.remove ('bx-x');
  navbar.classlist.remove ('active');
}