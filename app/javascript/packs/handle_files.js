export function handleFiles(files, $li, $label) {
  const $ul = $('#previews');
  const $inputs = $ul.find('.image_upload');

  $.each(files, function(index, file) {
    const preview = $(`
      <div class="image-preview__wrapper">
        <img class="preview">
        <div class="image-preview__btn">
          <div class="image-preview__btn_delete"></div>
        </div>
      </div>
    `);

    const append_input = $(`
      <li class="input">
        <label class="upload-label">
          <div class="upload-label__text">
            ドラッグアンドドロップ<br>またはクリックしてファイルをアップロード
          </div>
          <div class="input-area">
            <input class="hidden image_upload" type="file" name="spot[images_attributes][][name]">
          </div>
        </label>
      </li>
    `);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(event) {
      $(preview).find('.preview').attr('src', event.target.result);
    };

    reader.onloadend = function() {
      $li.append(preview);
      $label.hide();
      $li.removeClass('input').addClass('image-preview');

      const $lis = $ul.find('.image-preview');

      if ($lis.length < 10) {
        if ($ul.find('.input').length === 0) {
          $ul.append(append_input);
        }
      }

      $inputs.each(function(index, input) {
        $(input).attr('name', `spot[images_attributes][${index}][name]`);
      });

      adjustInputWidth($lis);
    };
  });
}

export function adjustInputWidth($lis) {
  const $lastLi = $('#previews li:last-child');
  if ($lis.length == 5) {
    $lastLi.css('width', '100%');
  } else if ($lis.length < 5) {
    $lastLi.css('width', `calc(100% - (20% * ${$lis.length}))`);
  } else if ($lis.length > 5 && $lis.length < 10) {
    $lastLi.css('width', `calc(100% - (20% * (${$lis.length} - 5)))`);
  }
}
