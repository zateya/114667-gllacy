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
    if (pageOverlay && pageOverlay.classList.contains("page-overlay--hide")) {
       pageOverlay.classList.remove("page-overlay--hide");
       pageOverlay.classList.add("page-overlay--show");
    };
    feedbackPopup.classList.remove("popup--closed");
    feedbackPopup.classList.add("popup--opened");
    clientName.focus();

    if (storageName && !storageEmail) {
         clientName.value = storageName;
         clientEmail.focus();
     } else if (storageName && storageEmail) {
         clientName.value = storageName;
         clientEmail.value = storageEmail;
         clientMessage.focus();
     } else {
         clientName.focus();
     };
  });

  feedbackForm.addEventListener("submit", function(event) {
    if (clientName.value && clientEmail.value && clientMessage.value) {
      localStorage.setItem('clientName', clientName.value);
      localStorage.setItem('clientEmail', clientEmail.value);
    }
  });

  feedbackClose.addEventListener("click", function(event) {
    event.preventDefault();
    feedbackPopup.classList.remove("popup--opened");
    feedbackPopup.classList.add("popup--closed");
    feedbackPopup.classList.remove("popup--error");

    if (pageOverlay && pageOverlay.classList.contains("page-overlay--show")) {
      pageOverlay.classList.remove("page-overlay--show");
      pageOverlay.classList.add("page-overlay--hide");
    };
  });

  if (pageOverlay) {
    pageOverlay.addEventListener("click", function(event) {
      event.preventDefault();
      if (feedbackPopup.classList.contains("popup--opened")) {
        feedbackPopup.classList.remove("popup--opened");
        feedbackPopup.classList.add("popup--closed");
        feedbackPopup.classList.remove("popup--error");
      };
      if (pageOverlay.classList.contains("page-overlay--show")) {
        pageOverlay.classList.remove("page-overlay--show");
        pageOverlay.classList.add("page-overlay--hide");
      };
    });
  };

  window.addEventListener("keydown", function(event) {
    if (event.keyCode === 27) {
      if (feedbackPopup.classList.contains("popup--opened")) {
        feedbackPopup.classList.remove("popup--opened");
        feedbackPopup.classList.add("popup--closed");
        feedbackPopup.classList.remove("popup--error");
      };
      if (pageOverlay.classList.contains("page-overlay--show")) {
        pageOverlay.classList.remove("page-overlay--show");
        pageOverlay.classList.add("page-overlay--hide");
      };
    };
  });
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
      iconImageOffset: [-40, -140],
      // Добавляем иконку тени и задаем аналогичные параметры.
      iconShadow: true,
      iconShadowLayout: 'default#image',
      iconShadowImageHref: 'img/icons/pin-shadow.png',
      iconShadowImageSize: [182, 110],
      iconShadowImageOffset: [0, -110]
    });

    map.geoObjects.add(Placemark);
    map.behaviors.disable('scrollZoom');
    map.controls.add('zoomControl');
    var roadcontrolState = map.controls.get('zoomControl').state.get('size');
    map.controls.get('zoomControl').options.set('size', 'small');
  });
})();
