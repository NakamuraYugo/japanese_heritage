/* global google */ // Google Maps JS API のグローバルを利用（lint対策）

/**
 * @module spot_map
 * 指定要素の data-lat / data-lng / data-zoom から Google Map を初期化します。
 * defensive check(防御的な存在確認) を追加して安全に動かします。
 */
const spotMap = {
  /**
   * @param {HTMLElement} mapEl - 緯度・経度・ズーム情報を含む要素(#map)
   */
  init(mapEl) {
    if (!mapEl) return;

    // 1) 座標バリデーション（validation: 値の検証）
    const lat = parseFloat(mapEl.dataset.lat);
    const lng = parseFloat(mapEl.dataset.lng);
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      console.error("Invalid latitude or longitude for map element:", mapEl);
      return;
    }

    // 2) Google Maps JS API の存在確認（defensive check: 防御策）
    if (typeof window.google === 'undefined' || !window.google.maps) {
      console.error("Google Maps API is not loaded. Cannot initialize map for element:", mapEl);
      return;
    }

    // 3) zoom のフォールバック（fallback: 代替値）
    const parsedZoom = parseInt(mapEl.dataset.zoom, 10);
    const zoom = Number.isNaN(parsedZoom) ? 15 : parsedZoom;

    // 4) Map/Marker 初期化（initialize/初期化）
    const map = new window.google.maps.Map(mapEl, {
      center: { lat, lng },
      zoom
    });
    new window.google.maps.Marker({ position: { lat, lng }, map });
  }
};

export default spotMap;
