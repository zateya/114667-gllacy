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
