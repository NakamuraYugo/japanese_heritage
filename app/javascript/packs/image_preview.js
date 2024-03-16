window.previewImages = function(event) {
  const files = event.target.files;
  const previewContainer = document.getElementById('images-preview');

  // 既存のプレビューをクリア
  previewContainer.innerHTML = '';

  // 選択された各ファイルに対してプレビューを作成
  Array.from(files).forEach(file => {
    const reader = new FileReader();
    reader.onload = function(e) {
      const img = document.createElement('img');
      img.setAttribute('src', e.target.result);
      img.classList.add('img-preview'); // CSSでスタイルを設定
      previewContainer.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
}
