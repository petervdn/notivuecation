import NotificationType from './NotificationType';
import { IINotificationLabels, INotifyParams } from './interface';

const defaultLabels = {
  confirmOk: 'Ok',
  cancel: 'Cancel',
  alertOk: 'Ok',
};
const defaultCssClasses = {
  confirm: 'confirm',
  cancel: 'cancel',
};

export const createShowActionForType = (
  type: NotificationType,
  notifyMethod: (payload: INotifyParams) => Promise<any>,
) => (param: IINotificationLabels | string) => {
  const labels = {
    confirmOkLabel:
      typeof param !== 'string' && param.confirm ? param.confirm : defaultLabels.confirmOk,
    alertOkLabel:
      typeof param !== 'string' && param.confirm ? param.confirm : defaultLabels.alertOk,
    cancel: typeof param !== 'string' && param.cancel ? param.cancel : defaultLabels.cancel,
  };

  const data: any = {
    buttons: [],
    message: typeof param === 'string' ? param : param.message,
  };

  const confirmButton = {
    label: labels.confirmOkLabel,
    value: true,
    css: defaultCssClasses.confirm,
  };

  let defaultTitle;

  if (type === NotificationType.ALERT) {
    data.buttons = [confirmButton];
    defaultTitle = 'Alert';
  } else if (type === NotificationType.CONFIRM) {
    const cancelButton = {
      label: labels.cancel,
      value: false,
      css: defaultCssClasses.cancel,
    };
    data.buttons = [confirmButton, cancelButton];
    defaultTitle = 'Confirm';
  } else {
    throw new Error(`Unknown type: ${type}`);
  }

  data.title = typeof param !== 'string' && param.title !== void 0 ? param.title : defaultTitle;

  return notifyMethod(data);
};
