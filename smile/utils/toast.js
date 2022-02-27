import { render, unmountComponentAtNode } from 'react-dom';
import Notification from '../components/notification';

export default {
  remove() {
    unmountComponentAtNode(document.getElementById('toast-container'));
    this.isCurrent = false;
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  },
  notify(message, options) {
    if (this.isCurrent) {
      this.remove();
    }
    render(<Notification text={message} type={options.type} />, document.getElementById('toast-container'));
    this.isCurrent = true;
    this.timeout = setTimeout(this.remove, 5000);
  },
  isCurrent: false,
  timeout: null,
};
