(function () {
  var feedbackLink = document.querySelector(".map__feedback-btn");
  var feedbackPopup = document.querySelector("#feedback-popup");
  var pageOverlay = document.querySelector(".page-overlay");
  var searchLink = document.querySelector(".user-search-link");
  var enterLink = document.querySelector(".user-enter-link");
  var basketLink = document.querySelector(".user-basket-link--products");
  var mapСontent = document.querySelector("#map");

  if(feedbackPopup) {
    var feedbackClose = feedbackPopup.querySelector(".popup__close");
    var feedbackForm = feedbackPopup.querySelector(".feedback");
    var clientName = feedbackForm.querySelector("#feedback-name");
    var clientEmail = feedbackForm.querySelector("#feedback-email");
    var clientMessage = feedbackForm.querySelector("#feedback-message");

    var storageName = localStorage.getItem("clientName");
    var storageEmail = localStorage.getItem("clientEmail");
  };

  if (basketLink) {
    basketLink.addEventListener("click", function(event) {
      event.preventDefault();
      basketLink.classList.toggle("user-basket-link--opened");
    });

    window.addEventListener("keydown", function(event) {
      if (event.keyCode === 27) {
        if (basketLink.classList.contains("user-basket-link--opened")) {
          basketLink.classList.remove("user-basket-link--opened");
        };
      };
    });
  };

  if (searchLink) {
    searchLink.addEventListener("click", function(event) {
      event.preventDefault();
      searchLink.classList.toggle("user-search-link--opened");
    });

    window.addEventListener("keydown", function(event) {
      if (event.keyCode === 27) {
        if (searchLink.classList.contains("user-search-link--opened")) {
          searchLink.classList.remove("user-search-link--opened");
        };
      };
    });
  };

  if (enterLink) {
    enterLink.addEventListener("click", function(event) {
      event.preventDefault();
      enterLink.classList.toggle("user-enter-link--opened");
    });

    window.addEventListener("keydown", function(event) {
      if (event.keyCode === 27) {
        if (enterLink.classList.contains("user-enter-link--opened")) {
          enterLink.classList.remove("user-enter-link--opened");
        };
      };
    });
  };

  if (feedbackLink && feedbackPopup) {
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

 if (mapСontent) {
   ymaps.ready(function () {
     var map = new ymaps.Map('map', {
       center: [59.939390, 30.329545],
       zoom: 16,
       scrollZoom: false,//зум при скролле мышью отключен
       controls: []//элементы контролов отсутствуют (строка поиска, кнопки зума, кнопки типа карты и тд)
     }, {
       searchControlProvider: 'yandex#search'
     }),
     Placemark = new ymaps.Placemark([59.938706, 30.323149], {
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
 };
})();
