import { handleFiles } from './handle_files';

$(document).on('turbolinks:load', function() {
  function handleDrop(event) {
    event.preventDefault();
    const files = event.originalEvent.dataTransfer.files;
    if (files.length) {
      handleFiles(files, $('#previews .input').first(), $('#previews .input').first().find('.upload-label'));
    }
  }

  const dropArea = $('#previews');

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

  dropArea.on('drop', handleDrop);
});
