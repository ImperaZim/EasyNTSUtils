import { ModalComponents } from './component/ComponentInterface';

interface onSubmit {
  elementType: "row" | "modal",
  elementIdentifier: string,
}

export interface Modal {
  title: string;
  components?: ModalComponents;
  onSubmit?: onSubmit;
}
