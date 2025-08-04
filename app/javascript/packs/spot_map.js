export default {
  /**
   * @param {HTMLElement} mapEl
   */
  init(mapEl) {
    const lat = parseFloat(mapEl.dataset.lat);
    const lng = parseFloat(mapEl.dataset.lng);
    const zoom = mapEl.dataset.zoom ? parseInt(mapEl.dataset.zoom, 10) : 15;
    const map = new google.maps.Map(mapEl, {
      center: { lat, lng },
      zoom: zoom
    });
    new google.maps.Marker({ position: { lat, lng }, map: map });
  }
}
