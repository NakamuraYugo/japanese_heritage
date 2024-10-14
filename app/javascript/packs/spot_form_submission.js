import Swal from 'sweetalert2';
import { validateSpotImages } from './image_validation.js';

$(document).on('turbolinks:load', function() {
  const $spotForm = $('#spot-form');
  
  if ($spotForm.length) {
    const $submitButton = $spotForm.find('input[type="submit"]');
    
    if ($submitButton.length) {
      $submitButton.on('click', function(event) {
        event.preventDefault(); // フォーム送信をキャンセル

        // 1. 画像のバリデーション
        if (!validateSpotImages()) {
          Swal.fire({
            icon: 'error',
            title: '画像が必要です',
            text: '画像を1枚以上選択してください',
            confirmButtonText: 'OK'
          });
          return; 
        }

        // 2. その他のバリデーション (スポットネーム、スポット詳細など)
        if (!$spotForm[0].checkValidity()) {
          $spotForm[0].reportValidity();
          return;
        }

        // 3. SweetAlert で確認
        Swal.fire({
          title: '本当に投稿してよろしいですか？',
          showCancelButton: true,
          confirmButtonText: 'はい',
          cancelButtonText: 'いいえ'
        }).then((result) => {
          if (result.isConfirmed) {
            $spotForm[0].submit(); // フォームを送信
          }
        });
      });
    }
  }
});
