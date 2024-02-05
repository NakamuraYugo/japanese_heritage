window.previewImage = function(event) {
  const target = event.target;

  // const file = target.files[0]; の行では、ユーザーが選択したファイルを取得していますが、この時点ではまだファイルの内容は読み込まれていません。ファイルの内容は、FileReader オブジェクトによって読み込まれます。
  const file = target.files[0];

  // FileReader オブジェクトを作成します。
  const reader = new FileReader();

  // ここで、画像のプレビューを表示する処理を書く
  // ここでは reader の onload イベントハンドラを設定しますが、この時点で実行されるわけではありません。ファイルの読み込みが完了した時に実行される関数を定義しています。ファイルの読み込みは、reader の readAsDataURL メソッドを呼び出すことで開始されます。
  reader.onload = function (e) {
    const previewElement = document.getElementById("preview");
    if (previewElement) {
      // ここで e.target.result にはreader.readAsDataURL(file)で読み込まれたファイルの内容（Base64エンコードされた画像データ）が含まれており、このデータが previewElement.src に設定されて画像が表示されます。
      previewElement.src = e.target.result;
    }
  };

// ここで画像ファイルが存在していたら、その画像ファイルを読み込む処理を書いています。
// FileReader.readAsDataURL メソッドは、ファイルの内容をBase64エンコードされたURL形式で読み込み、これを例えば画像の src 属性に設定することで画像を表示する際などに使われます。
// ファイルの読み込みが完了すると、onload イベントハンドラがトリガーされ、reader.onload で定義した関数が実行されます。
  if (file) {
    reader.readAsDataURL(file);
  }
}
