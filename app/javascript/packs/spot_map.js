export default {
  // JSDoc（ジェイエスドック）
  /**
   * @param {HTMLElement} mapEl
   */
  init(mapEl) {
    const lat = parseFloat(mapEl.dataset.lat);
    const lng = parseFloat(mapEl.dataset.lng);
    const map = new google.maps.Map(mapEl, {
      center: { lat, lng },
      zoom: 15
    });
    new google.maps.Marker({ position: { lat, lng }, map: map });
  }
};
