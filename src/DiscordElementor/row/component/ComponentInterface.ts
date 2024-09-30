import { Buttons } from './button/ButtonInterface';  // Importando a interface de Buttons
import { Selects } from './select/SelectInterface';   // Importando a interface de Selects

/**
 * Interface para os componentes que contêm botões e selects.
 */
export interface Components {
  /** Um array de botões. */
  buttons: Buttons[];   // Retorna um array de botões
  /** Um array de selects. */
  selects: Selects[];   // Retorna um array de selects
}