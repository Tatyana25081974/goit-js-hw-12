import { fetchImages } from './js/pixabay-api'; //функція для отримання зображень із Pixabay API.
import { renderImageGallery, clearGallery } from './js/render-functions';//функція для створення HTML-розмітки галереї.,функція для очищення галереї.
import SimpleLightbox from 'simplelightbox';//бібліотека для створення модального вікна зі збільшеним зображенням.
import 'simplelightbox/dist/simple-lightbox.min.css';// стилі для бібліотеки SimpleLightbox.
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';


const form = document.querySelector('.search-form');//знаходимо HTML-елемент форми для пошуку зображень за класом .search-form
const loadMoreBtn = document.querySelector('.load-more');//знаходимо кнопку "Load more" за класом .load-more
const gallery = document.querySelector('.gallery');//знаходимо контейнер для галереї зображень за класом .gallery
const loader = document.querySelector('.loader'); // лоадер для індикації завантаження.


let query = '';//зберігає ключове слово, яке ввів користувач у формі.
let page = 1;//номер сторінки результатів пошуку. Починаємо з 1.
const perPage = 15;//кількість зображень, які ми завантажуємо за один запит (15 зображень).
let totalHits = 0;//загальна кількість доступних зображень для заданого ключового слова (повертається API).

//Ініціалізація SimpleLightbox
const lightbox = new SimpleLightbox('.gallery a'); //Використовується для створення модального вікна, де зображення відкривається у великому розмірі.

// Функція для показу лоадера.
function showLoader() {
  loader.classList.remove('hidden'); // Показуємо лоадер.
}

// Функція для приховування лоадера.
function hideLoader() {
  loader.classList.add('hidden'); // Ховаємо лоадер
}


//Обробка події submit форми
//слухаємо подію submit на формі (тобто коли користувач натискає "Search").Коли форма відправляється, виконується функція
form.addEventListener('submit', async (event) => {
  event.preventDefault(); //Забороняємо перезавантаження сторінки, яке відбувається за замовчуванням під час відправки форми.
  query = event.currentTarget.elements.searchQuery.value.trim();//Отримуємо значення поля введення з ім'ям searchQuery.Видаляємо зайві пробіли з початку і кінця тексту.
    if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query.',
    });
    return;
  }
    

//Скидаємо налаштування для нового пошуку
  page = 1; //Оновлюємо сторінку на 1, тому що починаємо новий пошук
  clearGallery(); //Видаляємо всі попередні зображення з галереї
    loadMoreBtn.classList.add('hidden'); //Ховаємо кнопку "Load more", поки не отримали нові результати.
    showLoader();
//Виконуємо запит на отримання зображень
  try {
    const data = await fetchImages(query, page, perPage);// fetchImages:Викликаємо функцію для отримання зображень із API.Передаємо query (ключове слово), page (номер сторінки) і perPage (кількість зображень)
    totalHits = data.totalHits;// Зберігаємо загальну кількість результатів, які повернув сервер

    if (totalHits === 0) {
     iziToast.info({
        title: 'Info',
        message: 'Sorry, no images match your search query. Please try again.',
      });
      return;
    }  //Якщо сервер повернув 0 результатів, показуємо повідомлення і завершуємо виконання функції.

//Відображаємо зображення
    renderImageGallery(data.hits);//Передаємо список зображень (data.hits) у функцію, яка створює їх HTML-розмітку і додає в галерею.
    lightbox.refresh(); //Оновлюємо SimpleLightbox, щоб нові зображення теж відкривалися у модальному вікні.

    iziToast.success({
      title: 'Success',
      message: `Hooray! We found ${totalHits} images.`,
    });  
      //Показуємо кнопку "Load more", якщо є ще зображення
    if (page * perPage < totalHits) {
      loadMoreBtn.classList.remove('hidden'); //Якщо завантажених зображень ще недостатньо для досягнення totalHits, показуємо кнопку "Load more".
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'An error occurred while fetching images. Please try again.',
    });
    console.error('Error during search:', error);
  } finally {
    hideLoader(); // Ховаємо лоадер після завершення запиту.
  }
});

//Обробка події кліку на кнопку "Load more"

loadMoreBtn.addEventListener('click', async () => {
  page += 1; //Переходимо до наступної сторінки результатів.
  showLoader(); // Показуємо лоадер.

  try {
    const data = await fetchImages(query, page, perPage);//Викликаємо fetchImages для завантаження зображень із наступної сторінки

    renderImageGallery(data.hits);//Додаємо нові зображення до вже існуючих у галереї.
    lightbox.refresh(); //Оновлюємо SimpleLightbox.
      
    //Ховаємо кнопку, якщо досягли кінця результатів
    if (page * perPage >= totalHits) {
      loadMoreBtn.classList.add('hidden');
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      smoothScroll(); //Інакше викликаємо функцію плавного прокручування.
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'An error occurred while loading more images.',
    });
    console.error('Error loading more images:', error);
  } finally {
    hideLoader(); // Ховаємо лоадер після завершення запиту.
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
