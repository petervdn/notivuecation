import NotificationType from './NotificationType';

export interface IButton {
  label: string;
  css?: string;
  value?: any;
}

export interface IINotificationLabels {
  message: string;
  title?: string;
  confirm?: string;
  cancel?: string;
}

export interface INotifyParams {
  message: string;
  title: string;
  buttons: IButton[];
  type?: NotificationType;
}

export interface INotificationData extends INotifyParams {
  resolve?: (result: any) => void;
}

export interface IOptions {
  addMethodsToVue?: boolean;
  componentName?: string;
  getButtonForEscape?: (notification: INotificationData) => IButton;
}

export type LabelsOrString = IINotificationLabels | string;
