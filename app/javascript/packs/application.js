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

$(document).on('turbolinks:load', function() {
  const $map = $('#map');
  if (!$map.length) return;

  import('../spot_map.js')
    .then((module) => {
      const initFn = module.default && module.default.init;
      if (typeof initFn === 'function') {
        initFn($map[0]);
      }
    })
    .catch((err) => console.error(err));
});

