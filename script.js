
document.querySelectorAll('[data-cta]').forEach(btn=>{
  btn.addEventListener('click',()=>{
    if(window.gtag){ gtag('event','cta_click',{label:btn.dataset.label||'cta'}); }
  });
});
