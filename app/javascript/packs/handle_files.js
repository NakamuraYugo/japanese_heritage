let newImageCounter = 100;
// 例: ここからスタート。既存が何枚あってもぶつからないように
// もっと大きい値にしてもOK

export function buildNewInputLi() {
  // 新しい画像を追加する度にカウンタをインクリメント
  newImageCounter++;

  // “newImageCounter” をそのまま form-index に使う
  return $(`
    <li class="input" data-file-type="new">
      <label class="upload-label">
        <div class="upload-label__text">
          ドラッグアンドドロップ<br>またはクリックしてファイルをアップロード
        </div>
        <div class="input-area">
          <input
            class="hidden image_upload"
            type="file"
            name="spot[images_attributes][${newImageCounter}][name]"
            data-form-index="${newImageCounter}"
            data-file-type="new"
          >
        </div>
      </label>
    </li>
  `);
}

// handleFiles: ファイル選択後にプレビューを作る
export function handleFiles(files, $li, $label) {
  const $ul = $('#previews');
  const $inputLi = $li; // 今回ファイルを選んだ <li class="input">

  $.each(files, function(i, file) {
    // FileReader で読み込み
    const reader = new FileReader();

    // プレビュー用 DOM
    const preview = $(`
      <div class="image-preview__wrapper">
        <!-- 新規追加なので data-file-type="new" とする -->
        <img class="preview" data-file-type="new">
        <div class="image-preview__btn">
          <div class="image-preview__btn_delete"></div>
        </div>
      </div>
    `);

    reader.onload = function(e) {
      preview.find('img.preview').attr('src', e.target.result);
    };

    reader.onloadend = function() {
      // もともとの <li class="input"> 内にプレビューを差し込む
      $inputLi.append(preview);

      // もうアップロードラベルは不要なので隠す/削除する
      $label.hide();
      $inputLi.removeClass('input').addClass('image-preview');

      // 10枚制限チェック
      const $visiblePreviews = $ul.find('.image-preview:visible');
      const count = $visiblePreviews.length;
      if (count < 10) {
        // まだ10枚未満なら、新しい空の <li class="input"> があるか確認
        if ($ul.find('li.input').length === 0) {
          $ul.append(buildNewInputLi());
        }
      } else {
        // 10枚に達したら、追加できないように既存の input を消す
        $ul.find('li.input').remove();
      }
    };

    reader.readAsDataURL(file);
  });
}
