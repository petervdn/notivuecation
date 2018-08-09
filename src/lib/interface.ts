export interface IButton {
  label: string;
  css: string;
  value?: any;
}

export interface IINotificationLabels {
  message: string;
  title?: string;
  confirm?: string;
  cancel?: string;
}

export interface INotificationData {
  resolve: (result: any) => void;
  message: string;
  title: string;
  buttons: IButton[];
}
