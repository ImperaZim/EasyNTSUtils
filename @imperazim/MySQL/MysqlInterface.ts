export interface MysqlBase {
  host?: string;
  user?: string;
  password?: string;
  database?: string;
}

export interface TableColumn {
  name: string;
  type: string;
}