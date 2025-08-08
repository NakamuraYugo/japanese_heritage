/**
 * @module spot_map
 * @description
 *   このモジュールは指定された緯度経度・ズームでGoogle Mapを初期化し、
 *   対象位置にマーカーを表示するシンプルなインターフェースを提供します。
 *
 * @example
 *   // HTML:
 *   // <div id="map" data-lat="35.6895" data-lng="139.6917" data-zoom="14"></div>
 *
 *   // JavaScript:
 *   import spotMap from './spot_map';
 *   const mapEl = document.getElementById('map');
 *   spotMap.init(mapEl);
 *
 * @exports spot_map
 */
export default {
  /**
   * 指定したHTML要素(mapEl)のデータ属性をもとにGoogle Mapを初期化します。
   *
   * @param {HTMLElement} mapEl - 緯度・経度・ズーム情報を含む要素
   */
  init(mapEl) {
    const lat = parseFloat(mapEl.dataset.lat);
    const lng = parseFloat(mapEl.dataset.lng);
    if (isNaN(lat) || isNaN(lng)) {
      console.error("Invalid latitude or longitude for map element:", mapEl);
      return;
    }
    const zoom = mapEl.dataset.zoom ? parseInt(mapEl.dataset.zoom, 10) : 15;
    const map = new google.maps.Map(mapEl, {
      center: { lat, lng },
      zoom: zoom
    });
    new google.maps.Marker({ position: { lat, lng }, map: map });
  }
}
