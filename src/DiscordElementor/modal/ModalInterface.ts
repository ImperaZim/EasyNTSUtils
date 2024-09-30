import { Components } from './component/ComponentInterface';

export interface onSubmit {
  elementType: "row" | "modal",
  elementIdentifier: string,
}

export interface Modal {
  title: string;
  components: Components;
  onSubmit?: onSubmit;
}
