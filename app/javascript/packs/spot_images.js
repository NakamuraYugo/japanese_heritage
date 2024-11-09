import { handleFiles } from './handle_files';

$(document).on('turbolinks:load', function() {
  function handleImageChange(e) {
    handleFiles(e.target.files, $(this).closest('li'), $(this).closest('.upload-label'));
  }

  // 既存の 'change' イベントを解除して重複を防ぐ
  $(document).off('change.imageUploadNamespace', '.image_upload');

  // 新たに 'change' イベントをバインド
  $(document).on('change.imageUploadNamespace', '.image_upload', handleImageChange);
});
