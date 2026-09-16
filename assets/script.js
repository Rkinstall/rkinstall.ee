
const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-menu');

function updateHeader(){
  header.classList.toggle('scrolled', window.scrollY > 24);
}
updateHeader();
window.addEventListener('scroll', updateHeader, {passive:true});

menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded','false');
}));

document.getElementById('year').textContent = new Date().getFullYear();

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
},{threshold:.08, rootMargin:'0px 0px -20px 0px'});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const items = [...document.querySelectorAll('.gallery-item')];
const dialog = document.getElementById('lightbox');
const lbImg = document.getElementById('lightbox-img');
const lbCaption = document.getElementById('lightbox-caption');
let current = 0;

function show(index){
  current = (index + items.length) % items.length;
  const item = items[current];
  lbImg.src = item.dataset.src;
  lbImg.alt = item.dataset.caption + ' – RK Install tehtud töö';
  lbCaption.textContent = item.dataset.caption;
}
items.forEach((item, index) => item.addEventListener('click', () => {
  show(index);
  dialog.showModal();
}));
dialog.querySelector('.lightbox-close').addEventListener('click', () => dialog.close());
dialog.querySelector('.lightbox-prev').addEventListener('click', () => show(current - 1));
dialog.querySelector('.lightbox-next').addEventListener('click', () => show(current + 1));
dialog.addEventListener('click', e => {
  const rect = dialog.getBoundingClientRect();
  if(e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) dialog.close();
});
document.addEventListener('keydown', e => {
  if(!dialog.open) return;
  if(e.key === 'ArrowLeft') show(current - 1);
  if(e.key === 'ArrowRight') show(current + 1);
});
