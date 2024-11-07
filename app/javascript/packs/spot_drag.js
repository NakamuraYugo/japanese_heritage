import { handleFiles } from './handle_files';

$(document).on('turbolinks:load', function() {
  const dropArea = $('#previews');

  // ドラッグ関連のイベントを解除して重複を防ぐ
  dropArea.off('dragover dragleave drop');

  dropArea.on('dragover', function(event) {
    event.preventDefault();
    event.stopPropagation();
    dropArea.addClass('drag-over');
  });

  dropArea.on('dragleave', function(event) {
    event.preventDefault();
    event.stopPropagation();
    dropArea.removeClass('drag-over');
  });

  dropArea.on('drop', function(event) {
    event.preventDefault();
    const files = event.originalEvent.dataTransfer.files;
    if (files.length) {
      handleFiles(files, $('#previews .input').first(), $('#previews .input').first().find('.upload-label'));
    }
  });
});
