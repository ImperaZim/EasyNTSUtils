export * from './row';
export * from './Text';
export * from './modal';
export * from './collector';

import { Rows } from './row/';

export interface Builder {
  rows?: Rows;
  modals?: any; // depois adicionar os types de Modal[]
}

export class BuilderRegistry {
  static builder: Builder = {
    rows: {},
    modals: {}
  };
}