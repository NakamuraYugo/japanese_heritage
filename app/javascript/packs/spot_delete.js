import Swal from 'sweetalert2';

$(document).on('turbolinks:load', function() {
  const csrfToken = $('meta[name="csrf-token"]').attr('content');

  $('.sweet-delete').on('click', function(e) {
    e.preventDefault();
    const url = $(this).attr('href');

    Swal.fire({
      text: '本当に削除しますか？',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'はい',
      cancelButtonText: 'いいえ'
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          url: url,
          type: 'DELETE',
          headers: {
            'X-CSRF-Token': csrfToken
          }
        }).done(function() {
          Swal.fire('削除完了', '削除が完了しました', 'success').then(() => {
            window.location.href = '/spots';
          });
        }).fail(function() {
          Swal.fire('エラー', '削除に失敗しました', 'error');
        });
      }
    });
  });
});
