$(document).on('turbolinks:load', function() {
  $(document).on('click', '.image-preview__btn_delete', function() {
    const append_input = $(`
      <li class="input">
        <label class="upload-label">
          <div class="upload-label__text">
            ドラッグアンドドロップ<br>またはクリックしてファイルをアップロード
            <div class="input-area">
              <input class="hidden image_upload" type="file">
            </div>
          </div>
        </label>
      </li>
    `);

    const $ul = $('#previews');
    const $li = $(this).closest('.image-preview');

    $li.remove();

    const $lis = $ul.find('.image-preview');
    if ($lis.length <= 4) {
      $('#previews li:last-child').css({
        'width': `calc(100% - (20% * ${$lis.length}))`
      });
    } else if ($lis.length == 5) {
      $('#previews li:last-child').css({
        'width': `100%`
      });
    } else if ($lis.length < 9) {
      $('#previews li:last-child').css({
        'width': `calc(100% - (20% * (${$lis.length} - 5)))`
      });
    } else if ($lis.length == 9) {
      $ul.append(append_input);
      $('#previews li:last-child').css({
        'width': `calc(100% - (20% * (${$lis.length} - 5)))`
      });
    }
  });
});
