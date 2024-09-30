/**
 * Interface para os campos de um embed.
 */
export interface EmbedField {
  /** Nome do campo */
  name: string;
  /** Valor do campo */
  value: string;
}

/**
 * Interface para o rodapé do embed.
 */
export interface EmbedFooter {
  /** Nome do rodapé */
  name: string;
  /** URL do ícone do rodapé */
  iconURL: string;
}

/**
 * Interface para o autor do embed.
 */
export interface EmbedAuthor {
  /** Nome do autor */
  name: string;
  /** URL do ícone do autor */
  iconURL: string;
}

/**
 * Interface para os dados de um embed.
 */
export interface EmbedData {
  /** Cor do embed */
  color: string; // Pode ser um número ou string hexadecimal
  /** Título do embed */
  title: string;
  /** URL do embed */
  url?: string; // Opcional, pois pode não ser sempre fornecido
  /** Autor do embed */
  author?: EmbedAuthor; // Opcional, pois pode não ser sempre fornecido
  /** Descrição do embed */
  description?: string; // Opcional
  /** URL da imagem em miniatura */
  thumbnail?: string; // Opcional
  /** Campos do embed */
  fields?: EmbedField[]; // Opcional
  /** URL da imagem principal do embed */
  image?: string; // Opcional
  /** Timestamp do embed */
  timestamp?: boolean; // Opcional, pois pode ser um Date
  /** Rodapé do embed */
  footer?: EmbedFooter; // Opcional
}

/**
 * Interface para um conjunto de embeds.
 * Cada chave representa um embed, que pode ser do tipo EmbedData.
 */
export interface Embeds {
  [key: string]: EmbedData; // Retorna um objeto que contém vários embeds
}
