import { handleFiles } from './handle_files';

$(document).on('turbolinks:load', function() {
  $(document).off('change.imageUploadNamespace', '.image_upload');

  $(document).on('change.imageUploadNamespace', '.image_upload', function(e) {
    const $li = $(this).closest('li');
    const $label = $(this).closest('.upload-label');
    handleFiles(e.target.files, $li, $label);
  });
});
