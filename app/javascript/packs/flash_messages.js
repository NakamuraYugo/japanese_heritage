/* flash_messages.js */
import Swal from 'sweetalert2';

const FLASH_SELECTOR = '.js-flash-message';

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

/** 表示してからノードを消す（BFCache復帰での再実行を防止） */
const showFlashMessages = () => {
  const nodes = document.querySelectorAll(FLASH_SELECTOR);
  if (!nodes.length) return;

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

    node.remove();
  });

  const container = document.getElementById('flash-messages');
  if (container) container.remove();
};

/** TurbolinksのBFCacheに入る前に掃除 */
const cleanupBeforeCache = () => {
  document.querySelectorAll(FLASH_SELECTOR).forEach((n) => n.remove());
  const container = document.getElementById('flash-messages');
  if (container) container.remove();
};

/** イベント登録（Turbolinks前提。DOMContentLoadedは不要） */
document.addEventListener('turbolinks:load', showFlashMessages);
document.addEventListener('turbolinks:before-cache', cleanupBeforeCache);
