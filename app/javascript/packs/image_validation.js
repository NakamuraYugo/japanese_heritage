export function validateSpotImages() {
  const $imageUploads = $('.image_upload');
  let hasImage = false;
  
  $imageUploads.each(function() {
    if (this.files.length > 0) {
      hasImage = true;
    }
  });

  return hasImage;
}
