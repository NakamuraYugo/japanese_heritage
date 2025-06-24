// Google Maps API の <script> 読み込み後にコールされるグローバル関数
window.initMap = function() {
  // #map 要素を取得
  const mapEl = document.getElementById('map');
  if (!mapEl) return;  // 存在しなければ何もしない

  // data-lat, data-lng 属性から緯度・経度を読み取る
  const lat = parseFloat(mapEl.dataset.lat);
  const lng = parseFloat(mapEl.dataset.lng);

  // 地図オブジェクトを生成
  const map = new google.maps.Map(mapEl, {
    center: { lat: lat, lng: lng },
    zoom: 15  // お好みでズームレベルを調整
  });

  // マーカーを立てる
  new google.maps.Marker({
    position: { lat: lat, lng: lng },
    map: map
  });
};
