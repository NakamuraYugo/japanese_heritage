import { buildNewInputLi } from './handle_files';

$(document).on('turbolinks:load', function() {
  $(document).on('click', '.image-preview__btn_delete', function() {
    const $ul = $('#previews');
    const $li = $(this).closest('.image-preview');

    // 既存 or 新規 を判定
    const fileType = $li.data('file-type');
    if (fileType === 'existing') {
      // 既存画像（DB保存済み）の場合: _destroy=true をONにして削除
      $li.find('.hidden-destroy-field').prop('checked', true);
      // DOMは残すが表示だけ消す
      $li.hide();
    } else {
      // 新規（まだDBにない）場合は DOM ごと削除
      $li.remove();
    }

    // 残っている「表示中の画像数」を数える
    const visibleCount = $ul.find('.image-preview:visible').length;
    if (visibleCount < 10) {
      // input が無ければ1つ追加
      if ($ul.find('li.input').length === 0) {
        // buildNewInputLi() を呼んで統一した構造を追加する
        $ul.append(buildNewInputLi());
      }
    } else {
      // 10枚以上なら input を削除
      $ul.find('li.input').remove();
    }
  });
});
