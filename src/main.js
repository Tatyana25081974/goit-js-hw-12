import { fetchImages } from './pixabay-api'; //функція для отримання зображень із Pixabay API.
import { renderImageGallery, clearGallery } from './render-functions';//функція для створення HTML-розмітки галереї.,функція для очищення галереї.
import SimpleLightbox from 'simplelightbox';//бібліотека для створення модального вікна зі збільшеним зображенням.
import 'simplelightbox/dist/simple-lightbox.min.css';// стилі для бібліотеки SimpleLightbox.
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';


const form = document.querySelector('.search-form');//знаходимо HTML-елемент форми для пошуку зображень за класом .search-form
const loadMoreBtn = document.querySelector('.load-more');//знаходимо кнопку "Load more" за класом .load-more
const gallery = document.querySelector('.gallery');//знаходимо контейнер для галереї зображень за класом .gallery
const loader = document.querySelector('.loader'); // Спінер для індикації завантаження.


let query = '';//зберігає ключове слово, яке ввів користувач у формі.
let page = 1;//номер сторінки результатів пошуку. Починаємо з 1.
const perPage = 15;//кількість зображень, які ми завантажуємо за один запит (15 зображень).
let totalHits = 0;//загальна кількість доступних зображень для заданого ключового слова (повертається API).

//Ініціалізація SimpleLightbox
const lightbox = new SimpleLightbox('.gallery a'); //Використовується для створення модального вікна, де зображення відкривається у великому розмірі.

// Функція для показу спінера.
function showLoader() {
  loader.classList.remove('hidden'); // Показуємо спінер.
}

// Функція для приховування спінера.
function hideLoader() {
  loader.classList.add('hidden'); // Ховаємо спінер.
}
//Обробка події submit форми
//слухаємо подію submit на формі (тобто коли користувач натискає "Search").Коли форма відправляється, виконується функція
form.addEventListener('submit', async (event) => {
  event.preventDefault(); //Забороняємо перезавантаження сторінки, яке відбувається за замовчуванням під час відправки форми.
  query = event.currentTarget.elements.searchQuery.value.trim();//Отримуємо значення поля введення з ім'ям searchQuery.Видаляємо зайві пробіли з початку і кінця тексту.
    if (!query) return;//Якщо користувач нічого не ввів, просто завершуємо виконання функції.
    

//Скидаємо налаштування для нового пошуку
  page = 1; //Оновлюємо сторінку на 1, тому що починаємо новий пошук
  clearGallery(); //Видаляємо всі попередні зображення з галереї
    loadMoreBtn.classList.add('hidden'); //Ховаємо кнопку "Load more", поки не отримали нові результати.
    
//Виконуємо запит на отримання зображень
  try {
    const data = await fetchImages(query, page, perPage);// fetchImages:Викликаємо функцію для отримання зображень із API.Передаємо query (ключове слово), page (номер сторінки) і perPage (кількість зображень)
    totalHits = data.totalHits;// Зберігаємо загальну кількість результатів, які повернув сервер

    if (totalHits === 0) {
      alert("Sorry, no images match your search query. Please try again.");
      return;
    }  //Якщо сервер повернув 0 результатів, показуємо повідомлення і завершуємо виконання функції.

//Відображаємо зображення
    renderImageGallery(data.hits);//Передаємо список зображень (data.hits) у функцію, яка створює їх HTML-розмітку і додає в галерею.
    lightbox.refresh(); //Оновлюємо SimpleLightbox, щоб нові зображення теж відкривалися у модальному вікні.

      
      //Показуємо кнопку "Load more", якщо є ще зображення
    if (page * perPage < totalHits) {
      loadMoreBtn.classList.remove('hidden'); //Якщо завантажених зображень ще недостатньо для досягнення totalHits, показуємо кнопку "Load more".
    }
  } catch (error) {
    console.error('Error during search:', error);
  } finally {
    hideLoader(); // Ховаємо спінер після завершення запиту.
  }
});

//Обробка події кліку на кнопку "Load more"

loadMoreBtn.addEventListener('click', async () => {
  page += 1; //Переходимо до наступної сторінки результатів.
  showLoader(); // Показуємо спінер.

  try {
    const data = await fetchImages(query, page, perPage);//Викликаємо fetchImages для завантаження зображень із наступної сторінки

    renderImageGallery(data.hits);//Додаємо нові зображення до вже існуючих у галереї.
    lightbox.refresh(); //Оновлюємо SimpleLightbox.
      
    //Ховаємо кнопку, якщо досягли кінця результатів
    if (page * perPage >= totalHits) {
      loadMoreBtn.classList.add('hidden');
      alert("We're sorry, but you've reached the end of search results.");//Якщо завантажили всі доступні зображення, ховаємо кнопку "Load more" і показуємо повідомлення.
    } else {
      smoothScroll(); //Інакше викликаємо функцію плавного прокручування.
    }
  } catch (error) {
    console.error('Error loading more images:', error);
  } finally {
    hideLoader(); // Ховаємо спінер після завершення запиту.
  }
});
//Плавне прокручування сторінки
function smoothScroll() { //оголошення звичайної функції, яка виконує прокручування сторінки.
    const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();//Отримуємо висоту першої картки.Ми отримуємо тільки властивість height (висоту елемента) з результату getBoundingClientRect() і зберігаємо її в змінну cardHeight.
    
    //Це метод, який прокручує сторінку на задану кількість пікселів від поточного положення.
//window.scrollBy({ top: значення, behavior: 'тип' });
 window.scrollBy({
    top: cardHeight * 2,//Вказує, наскільки вниз потрібно прокрутити сторінку.Ми прокручуємо на відстань, яка дорівнює двом висотам першої картки (щоб нові додані елементи стали видимими).
    behavior: 'smooth',//Визначає, що прокрутка повинна бути плавною (замість різкого стрибка).
  });
}
