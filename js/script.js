ymaps.ready(function () {
  var myMap = new ymaps.Map('map', {
    center: [59.939390, 30.329545],
    zoom: 16,
    scrollZoom: false,//зум при скролле мышью отключен
    controls: []//элементы контролов отсутствуют (строка поиска, кнопки зума, кнопки типа карты и тд)
  }, {
    searchControlProvider: 'yandex#search'
  }),
  myPlacemark1 = new ymaps.Placemark([59.938631, 30.323055], {
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
  myMap.geoObjects.add(myPlacemark1);
  myMap.behaviors.disable('scrollZoom');
  myMap.controls.add('zoomControl');
  var roadcontrolState = myMap.controls.get('zoomControl').state.get('size');
  myMap.controls.get('zoomControl').options.set('size', 'small');
});
