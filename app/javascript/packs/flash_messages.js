import Swal from 'sweetalert2';

const FLASH_SELECTOR = '.js-flash-message';
const FLASH_CONTAINER_ID = 'flash-messages';

/** Bootstrap/Deviseの種別→SweetAlert2アイコンへ */
const iconByType = (type) => {
  switch (String(type)) {
    case 'success':
    case 'notice':
      return 'success';
    case 'danger':
    case 'alert':
      return 'error';
    case 'warning':
      return 'warning';
    default:
      return 'info';
  }
};

/** フラッシュ用のDOMを一括掃除（ノードとコンテナの両方） */
const removeFlashDom = () => {
  document.querySelectorAll(FLASH_SELECTOR).forEach((node) => node.remove());
  const container = document.getElementById(FLASH_CONTAINER_ID);
  if (container) container.remove();
};

/** 表示してからDOMを掃除（BFCache復帰や再実行を防止） */
const showFlashMessages = () => {
  const nodes = document.querySelectorAll(FLASH_SELECTOR);

  // 0件でも掃除は実施（残存コンテナ対策）
  if (!nodes.length) {
    removeFlashDom();
    return;
  }

  nodes.forEach((node) => {
    const type = node.dataset.flashType;
    const message = node.dataset.flashMessage;
    if (!message) return;

    Swal.fire({
      icon: iconByType(type),
      title: message,
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 5000
    });
  });

  // 表示直後に必ず掃除（このページでの再表示を防止）
  removeFlashDom();
};

/** TurbolinksのBFCacheに入る前にも念のため掃除 */
document.addEventListener('turbolinks:before-cache', removeFlashDom);

/** Turbolinks前提。DOMContentLoadedは不要 */
document.addEventListener('turbolinks:load', showFlashMessages);
