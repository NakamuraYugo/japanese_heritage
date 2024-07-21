import { handleFiles } from './handle_files';

$(document).on('turbolinks:load', function() {
  function handleImageChange(e) {
    handleFiles(e.target.files, $(this).closest('li'), $(this).closest('.upload-label'));
  }

  $(document).on('change', '.image_upload', handleImageChange);
});
