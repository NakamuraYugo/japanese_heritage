import Swal from 'sweetalert2';

$(document).on('turbolinks:load', () => {
  const $form = $('#delete-spots-form');

  if (!$form.length) return;
  const $deleteButton = $form.find('input[type="submit"]');

  $deleteButton.off('click.deleteSpotsNamespace');

  $deleteButton.on('click.deleteSpotsNamespace', function (event) {
    event.preventDefault();

    const checked = $form.find('input[name="spot_ids[]"]:checked');
    if (checked.length === 0) {
    Swal.fire({
      icon: 'warning',
      title: '投稿が選択されていません',
      text:   '削除したい投稿にチェックを入れてください',
      confirmButtonText: 'OK'
    });
    return;
    }

    Swal.fire({
      title: '本当に削除してよろしいですか？',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'はい',
      cancelButtonText: 'いいえ'
    }).then(result => {
      if (result.isConfirmed) {
        $form.off('submit');
        $form.trigger('submit');
      }
    });
  });
});
