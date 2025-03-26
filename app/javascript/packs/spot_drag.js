import { handleFiles } from './handle_files';

$(document).on('turbolinks:load', function() {
  const dropArea = $('#previews');

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
    event.stopPropagation();
    dropArea.removeClass('drag-over');

    const files = event.originalEvent.dataTransfer.files;

    if (files.length) {
      const $li = $('#previews .input').first();
      const $label = $li.find('.upload-label');
      const input = $li.find('input.image_upload')[0];

      const dt = new DataTransfer();
      for (let i = 0; i < files.length; i++) {
        dt.items.add(files[i]);
      }

      input.files = dt.files;

      handleFiles(files, $li, $label);
    }
  });
});
