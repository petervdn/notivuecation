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
  resolve?: (result: any) => void;
}

export interface IOptions {
  addMethodsToVue?: boolean;
  componentName?: string;
}
