import NotificationType from './NotificationType';
import { IButton, IINotificationLabels, INotifyParams, LabelsOrString } from './interface';

const defaultLabels = {
  confirmOk: 'Ok',
  cancel: 'Cancel',
  alertOk: 'Ok',
};
const defaultCssClasses = {
  confirm: 'confirm',
  cancel: 'cancel',
};

/**
 * Converts LabelsOrString to IINotificationLabels
 * @param param
 */
export function createNotificationLabels(param: LabelsOrString): IINotificationLabels {
  return typeof param === 'string' ? { message: param } : param;
}

/**
 * Create the data-object that is needed to call the notify method.
 * @param notificationLabels
 * @param type
 */
export function createNotifyParams(
  notificationLabels: IINotificationLabels,
  type: NotificationType,
): INotifyParams {
  const labels = {
    confirmOk: notificationLabels.confirm || defaultLabels.confirmOk,
    alertOk: notificationLabels.confirm || defaultLabels.alertOk,
    cancel: notificationLabels.cancel || defaultLabels.cancel,
  };

  let buttons: IButton[];
  let title: string;
  if (type === NotificationType.ALERT) {
    buttons = [
      {
        label: labels.alertOk,
        css: defaultCssClasses.confirm,
      },
    ];
    title = notificationLabels.title || 'Alert';
  } else if (type === NotificationType.CONFIRM) {
    buttons = [
      {
        label: labels.confirmOk,
        value: true,
        css: defaultCssClasses.confirm,
      },
      {
        label: labels.cancel,
        value: false,
        css: defaultCssClasses.cancel,
      },
    ];
    title = notificationLabels.title || 'Confirm';
  } else {
    throw new Error(`Unknown type: ${type}`);
  }

  return {
    type,
    buttons,
    title,
    message: notificationLabels.message,
  };
}
