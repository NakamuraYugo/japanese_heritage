// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require ("jquery")
require("channels")
require("bootstrap");

// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
const images = require.context('../images', true)
const imagePath = (name) => images(name, true)

import Swal from 'sweetalert2'
window.Swal = Swal

import 'bootstrap'
import "../stylesheets/application.scss";
import '@fortawesome/fontawesome-free/js/all';
import './scripts.js';
import './spot_images.js';
import './spot_preview_delete.js';
import './handle_files.js';
import './spot_drag.js';
import './spot_form_submission.js';
import './image_validation.js';
import './spot_delete.js';
import 'lightbox2';
import 'lightbox2/dist/css/lightbox.css';
import 'lightbox2/dist/js/lightbox.min.js';
import './delete_spots_confirmation.js';
import './flash_messages';

function bootMap() {
  const map = document.getElementById('map');
  if (!map) return;

  // 二重初期化防止（flag/冪等）
  if (map.dataset.mapInitialized === '1') return;

  if (!map.dataset.lat || !map.dataset.lng) return;

  import('./spot_map.js')
    .then(module => {
      if (module.default && typeof module.default.init === 'function') {
        module.default.init(map);
        // 初期化済みフラグ（戻る/進むでも二重描画させない）
        map.dataset.mapInitialized = '1';
      }
    })
    .catch(err => console.error('Failed to load spot_map.js:', err));
}

// Google Maps API の callback（APIロード完了時に1度だけ呼ばれる）
window.initMap = bootMap;

// BFCache 復帰（戻る/進む）でも確実に初期化する保険
// （persisted=true ＝ BFCacheからの復元）
window.addEventListener('pageshow', (e) => {
  if (e.persisted && window.google && window.google.maps) bootMap();
});

// Turbolinks を使っているなら、戻る/進むや差し替え後の表示でも初期化
// [Do not remove] callback=initMap が再実行されないケースの保険。冪等フラグで二重初期化なし。
document.addEventListener('turbolinks:load', () => {
  if (window.google && window.google.maps) bootMap();
});
