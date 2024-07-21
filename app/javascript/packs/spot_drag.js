// $(document).on('turbolinks:load', function() {
//   function handleDrop(event) {
//     event.preventDefault();
//     const files = event.originalEvent.dataTransfer.files;
//     if (files.length) {
//       handleFiles(files);
//     }
//   }
  
//   function handleFiles(files) {
//     const $ul = $('#previews');
//     const $li = $(this).closest('li');
//     const $label = $(this).closest('.upload-label');
//     const $inputs = $ul.find('.image_upload');
  
//     const preview = $(`
//       <div class="image-preview__wrapper">
//         <img class="preview">
//         <div class="image-preview__btn">
//           <div class="image-preview__btn_delete"></div>
//         </div>
//       </div>
//     `);
  
//     const append_input = $(`
//       <li class="input">
//         <label class="upload-label">
//           <div class="upload-label__text">
//             ドラッグアンドドロップ<br>またはクリックしてファイルをアップロード
//           </div>
//           <div class="input-area">
//             <input class="hidden image_upload" type="file" name="spot[images_attributes][][name]">
//           </div>
//         </label>
//       </li>
//     `);
  
//     const reader = new FileReader();
//     reader.readAsDataURL(e.target.files[0]);
//     reader.onload = function(event) {
//       $(preview).find('.preview').attr('src', event.target.result);
//     };
  
//     reader.onloadend = function() {
//       $li.append(preview);
//       $label.hide();
//       $li.removeClass('input').addClass('image-preview');
  
//       const $lis = $ul.find('.image-preview');
  
//       if ($lis.length < 10) {
//         if ($ul.find('.input').length === 0) {
//           $ul.append(append_input);
//         }
//       }
  
//       $inputs.each(function(index, input) {
//         $(input).attr('name', `spot[images_attributes][${index}][name]`);
//         $(input).attr('id',  `spot_images_attributes_${index}_name_cache`);
//       });
  
//       adjustInputWidth($lis);
//     };
//   }
//   function adjustInputWidth($lis) {
//     const $lastLi = $('#previews li:last-child');
//     if ($lis.length == 5) {
//       $lastLi.css('width', '100%');
//     } else if ($lis.length < 5) {
//       $lastLi.css('width', `calc(100% - (20% * ${$lis.length}))`);
//     } else if ($lis.length > 5 && $lis.length < 10) {
//       $lastLi.css('width', `calc(100% - (20% * (${$lis.length} - 5)))`);
//     }
//   }
  
//   // ドラッグ&ドロップイベントの設定
//   const dropArea = $('#previews');
  
//   dropArea.on('dragover', function(event) {
//     event.preventDefault();
//     event.stopPropagation();
//     dropArea.addClass('drag-over');
//   });
  
//   dropArea.on('dragleave', function(event) {
//     event.preventDefault();
//     event.stopPropagation();
//     dropArea.removeClass('drag-over');
//   });
  
//   dropArea.on('drop', handleDrop);
// });


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
