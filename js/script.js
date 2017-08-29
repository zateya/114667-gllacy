(function () {
  var feedbackLink = document.querySelector(".map__feedback-btn");
  var feedbackPopup = document.querySelector("#feedback-popup");
  var feedbackClose = feedbackPopup.querySelector(".popup__close");
  var pageOverlay = document.querySelector(".page-overlay");

  var feedbackForm = feedbackPopup.querySelector(".feedback");
  var clientName = feedbackForm.querySelector("#feedback-name");
  var clientEmail = feedbackForm.querySelector("#feedback-email");
  var clientMessage = feedbackForm.querySelector("#feedback-message");

  var storageName = localStorage.getItem("clientName");
  var storageEmail = localStorage.getItem("clientEmail");

  if (feedbackLink) {
  feedbackLink.addEventListener("click", function(event) {
   event.preventDefault();
   if (pageOverlay) {
     pageOverlay.classList.remove("page-overlay--hide");
     pageOverlay.classList.add("page-overlay--show");
   };
   feedbackPopup.classList.add("popup--opened");
   clientName.focus();
  });

  feedbackClose.addEventListener("click", function(event) {
    event.preventDefault();
    feedbackPopup.classList.remove("popup--opened");
    pageOverlay.classList.add("page-overlay--hide");
    pageOverlay.classList.remove("page-overlay--show");
  });

  if (pageOverlay) {
    pageOverlay.addEventListener("click", function(event) {
       event.preventDefault();
       feedbackPopup.classList.remove("popup--opened");
       pageOverlay.classList.add("page-overlay--hide");
       pageOverlay.classList.remove("page-overlay--show");
     });
  };
 };

  ymaps.ready(function () {
    var map = new ymaps.Map('map', {
      center: [59.939390, 30.329545],
      zoom: 16,
      scrollZoom: false,//зум при скролле мышью отключен
      controls: []//элементы контролов отсутствуют (строка поиска, кнопки зума, кнопки типа карты и тд)
    }, {
      searchControlProvider: 'yandex#search'
    }),
    Placemark = new ymaps.Placemark([59.938631, 30.323055], {
      balloonContent: 'Санкт-Петербург, Большая Конюшенная улица, 19/8'
    }, {
      // Опции.
      iconLayout: 'default#image',
      // Своё изображение иконки метки.
      iconImageHref: 'img/icons/pin.svg',
      // Размеры метки.
      iconImageSize: [80, 140],
      // Смещение левого верхнего угла иконки относительно
      // её "ножки" (точки привязки).
      iconImageOffset: [-40, -140]
    });

    map.geoObjects.add(Placemark);
    map.behaviors.disable('scrollZoom');
    map.controls.add('zoomControl');
    var roadcontrolState = map.controls.get('zoomControl').state.get('size');
    map.controls.get('zoomControl').options.set('size', 'small');
  });
})();
