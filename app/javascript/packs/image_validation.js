export function validateSpotImages() {
  const $imageUploads = $('.image_upload');
  const $existingImages = $('.existing-spot-image:visible'); // 既存の画像を取得
  let hasImage = false;

  // 新規画像の選択チェック
  $imageUploads.each(function() {
    if (this.files.length > 0) {
      hasImage = true;
    }
  });

  // 既存画像がある場合、hasImage を true に設定
  if ($existingImages.length > 0) {
    hasImage = true;
  }

  return hasImage;
}
