export * from './row';
export * from './Text';
export * from './modal';
export * from './collector';

import { Rows, Modals } from './';

export interface Builder {
  rows?: Rows;
  modals?: Modals; // depois adicionar os types de Modal[]
}

export class BuilderRegistry {
  static builder: Builder = {
    rows: {},
    modals: {}
  };
}