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

export interface Modals {
  [key: string]: Modal; // Cada linha é identificada por uma chave do tipo string
}