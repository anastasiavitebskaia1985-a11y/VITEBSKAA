
document.querySelectorAll('[data-cta]').forEach(btn=>{
  btn.addEventListener('click',()=>{
    if(window.gtag){ gtag('event','cta_click',{label:btn.dataset.label||'cta'}); }
  });
});
/* ===== VITEBSKA: автодеталі для продуктів ===== */
document.addEventListener('DOMContentLoaded', () => {
  // 1) Тексти для кожного продукту (за назвою файлу картинки)
  const DETAILS = {
    "foundation_bottle.jpg": {
      title: "VITEBSKA Air Veil Foundation",
      meta: "30 мл • Сатиновий фініш • Made in Ukraine",
      html: `
        <p>Легка тональна основа з ефектом «шовкової вуалі». Вирівнює тон, не підкреслює текстуру, дарує природне сяйво без жирного блиску.</p>
        <ul>
          <li>Формула: вітамін E, гіалуронова кислота</li>
          <li>Покриття: легке–середнє, шаруюється</li>
          <li>Типи шкіри: нормальна / суха / комбінована</li>
        </ul>`
    },
    "concealer_wand.jpg": {
      title: "VITEBSKA Light Touch Concealer",
      meta: "8 мл • Сяючий фініш • Для зони під очима",
      html: `
        <p>Кремовий консилер, що мʼяко маскує темні кола і висвітлює погляд, не обтяжуючи шкіру.</p>
        <ul>
          <li>Покриття: середнє, без плям</li>
          <li>Інгредієнти: гіалуронова кислота, екстракт ромашки</li>
        </ul>`
    },
    "lip_pencil.jpg": {
      title: "VITEBSKA Sculpt Lip Pencil",
      meta: "Довжина 12 см • Nude Rose • Матовий",
      html: `
        <p>Мʼякий стійкий контур, що не розтікається. Ідеально поєднується з блиском або помадою.</p>
        <ul>
          <li>Текстура: кремова</li>
          <li>Догляд: олія жожоба, віск карнауби</li>
        </ul>`
    },
    "eye_pencil.jpg": {
      title: "VITEBSKA Soft Define Eye Pencil",
      meta: "Deep Espresso • Сатиновий фініш",
      html: `
        <p>Кремова формула для мʼяких денних ліній і виразних вечірніх образів. Легко розтушовується.</p>
        <ul>
          <li>Підходить для чутливих очей</li>
          <li>Догляд: вітамін E</li>
        </ul>`
    },
    "highlighter_compact.jpg": {
      title: "VITEBSKA Celestial Glow Highlighter",
      meta: "9 г • Шампанське сяйво • Тиснення зірок",
      html: `
        <p>Дає ефект «вологого блиску», не підкреслює текстуру, легко наслаюється.</p>
        <ul>
          <li>Фініш: глянцевий, без великих блискіток</li>
        </ul>`
    },
    "hero_blush_sparkle.jpg": {
      title: "VITEBSKA Cream Blush Stick",
      meta: "7 г • Soft Rose Glow • Кремово-сяючий",
      html: `
        <p>Тануча текстура дає природний румʼянець і свіжість. Поєднується з тональною та хайлайтером.</p>
        <ul>
          <li>Не липне, містить масло ши</li>
        </ul>`
    },
    "lip_gloss.jpg": {
      title: "VITEBSKA Mirror Lip Gloss",
      meta: "6 мл • Дзеркальне сяйво • Не липкий",
      html: `
        <p>Напівпрозорий блиск додає губам обʼєму і зволожує протягом дня.</p>
        <ul>
          <li>Аромат: делікатна ваніль</li>
          <li>Інгредієнти: олія авокадо, вітамін E</li>
        </ul>`
    }
  };

  // 2) Для кожної картки знайти зображення і підвʼязати “Деталі”
  document.querySelectorAll('.card.product, .product.card, .v-card, .product').forEach(card => {
    const img = card.querySelector('img');
    if(!img) return;

    // Витягуємо імʼя файлу з src (наприклад foundation_bottle.jpg)
    const src = (img.getAttribute('src') || '').split('/').pop().split('?')[0];
    const data = DETAILS[src];
    if(!data) return; // якщо немає в мапі — пропускаємо

    // Якщо в картці немає заголовка/мети — підставимо акуратно (не ламаємо твій старий текст)
    const titleEl = card.querySelector('h3') || card.querySelector('.title');
    if(!titleEl){
      const h3 = document.createElement('h3');
      h3.textContent = data.title;
      img.insertAdjacentElement('afterend', h3);
    }
    const metaEl = card.querySelector('.v-meta');
    if(!metaEl){
      const p = document.createElement('p');
      p.className = 'v-meta';
      p.textContent = data.meta;
      (card.querySelector('h3')||img).insertAdjacentElement('afterend', p);
    }

    // Створюємо/знаходимо кнопку
    let btn = card.querySelector('.details-btn, .v-btn');
    if(!btn){
      btn = document.createElement('button');
      btn.className = 'details-btn';
      btn.textContent = 'Деталі';
      const anchor = card.querySelector('a.details-btn');
      if(anchor) anchor.replaceWith(btn); else card.appendChild(btn);
    }

    // Додаємо контейнер для деталей (1 раз і поруч)
    let panel = card.querySelector('.v-details');
    if(!panel){
      panel = document.createElement('div');
      panel.className = 'v-details';
      panel.innerHTML = data.html;
      btn.insertAdjacentElement('afterend', panel);
    }

    // Обробник кліку: показ/приховати
    btn.addEventListener('click', () => {
      panel.classList.toggle('v-details--open');
      const expanded = panel.classList.contains('v-details--open');
      btn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });
  });
});
