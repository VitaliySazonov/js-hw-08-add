// Создай галерею с возможностью клика по ее элементам и просмотра
// полноразмерного изображения в модальном окне.
// Разбей задание на несколько подзадач:

// Создание и рендер разметки по массиву данных и предоставленному шаблону.

// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения. +
// Открытие модального окна по клику на элементе галереи. +
// Подмена значения атрибута src элемента img.lightbox__image. +
// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"]. +
// Очистка значения атрибута src элемента img.lightbox__image. +
// Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение,
// мы не видели предыдущее.

// Дополнительно
// Следующий функционал не обязателен при сдаче задания,
// но будет хорошей практикой по работе с событиями.
// Закрытие модального окна по клику на div.lightbox__overlay. +
// Закрытие модального окна по нажатию клавиши ESC. +

// Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".

// <li class="gallery__item">
//   <a
//     class="gallery__link"
//     href="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
//   >
//     <img
//       class="gallery__image"
//       src="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546__340.jpg"
//       data-source="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
//       alt="Tulips"
//     />
//   </a>
// </li>

import data from "./gallery-items.js";

class Gallery {
  constructor(imgList) {
    this.refs = {
      ul: document.querySelector(".js-gallery"),
      lightBox: document.querySelector(".js-lightbox"),
      lightBoxImage: document.querySelector(".lightbox__image"),
      lightBoxCloseButton: document.querySelector('button[data-action="close-lightbox"]'),
      lightBoxOverlay: document.querySelector(".lightbox__overlay"),
    };
    this.images = [];
    this.index = 0;
    // console.log(imgList)
    this.init(imgList);
  }

  init(images) {
    images.forEach((img) => {
      let li = `
  <li class="gallery__item">
    <a
      class="gallery__link"
      href="${img.original}"
    >
      <img
        class="gallery__image"
        src="${img.preview}"
        data-source="${img.original}"
        alt="${img.description}"
      />
    </a>

  </li>
  `;
      this.images.push(img.original);
      this.refs.ul.insertAdjacentHTML("beforeend", li);
    });
    this.refs.ul.addEventListener("click", this.open.bind(this));
    this.refs.lightBoxCloseButton.addEventListener("click", this.close.bind(this));
    this.refs.lightBoxOverlay.addEventListener("click", this.close.bind(this));
  }
  // Open button
  open(evt) {
    evt.preventDefault();
    if (evt.target.nodeName !== "IMG") return;
    this.index = this.images.indexOf(evt.target.dataset.source);
    window.addEventListener("keydown", this.keyAction.bind(this));
    this.imgUpdate(this.index);
    this.refs.lightBox.classList.add("is-open");
  }
  // lightBoxImage update
  imgUpdate(idx) {
    this.refs.lightBoxImage.src = this.images[idx];
  }

  // Close button
  close() {
    this.refs.lightBox.classList.remove("is-open");
    this.refs.lightBoxImage.src = "";
    window.removeEventListener("keydown", this.keyAction.bind(this));
  }
  
  // Key actions
  keyAction(evt) {
    if (evt.code === "Escape") this.close();
    if (evt.code === "ArrowLeft") {
      this.index -= 1;
      this.index < 0 ? (this.index = this.images.length - 1) : this.index;
    }
    if (evt.code === "ArrowRight") {
      this.index += 1;
      this.index === this.images.length ? (this.index = 0) : this.index;
    }
    console.log(this.index);
    this.imgUpdate(this.index);
  }
}
let gallery = new Gallery(data);
