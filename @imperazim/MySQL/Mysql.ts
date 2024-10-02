import { MysqlBase, TableColumn } from "./";
import mysql, { Pool, OkPacket, RowDataPacket } from "mysql2/promise";

export class MysqlConnection {
  private pool: Pool;

  constructor(config: MysqlBase) {
    this.pool = mysql.createPool(config);
  }

  /**
   * Cria uma tabela se ela não existir, usando um array de objetos para definir as colunas.
   * @param name Nome da tabela a ser criada
   * @param columns Array de objetos que definem as colunas (ex: [{ name: "id", type: "INT PRIMARY KEY" }])
   */
  public async createTable(name: string, columns: TableColumn[]) {
    const columnDefinitions = columns
      .map(col => `${col.name} ${col.type}`)
      .join(", ");
    const query = `CREATE TABLE IF NOT EXISTS ${name} (${columnDefinitions})`;

    const connection = await this.pool.getConnection();
    try {
      await connection.query(query);
    } catch (error) {
      throw error;
    } finally {
      connection.release();
    }
  }

  /**
   * Insere um novo registro em uma tabela.
   * @param table Nome da tabela
   * @param data Dados a serem inseridos (ex: { id: 1, name: 'John' })
   */
  public async insert(table: string, data: { [key: string]: any }) {
    const connection = await this.pool.getConnection();
    try {
      const columns = Object.keys(data).join(", ");
      const values = Object.values(data);
      const placeholders = values.map(() => "?").join(", ");

      const query = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;
      await connection.execute(query, values);
    } catch (error) {
      throw error;
    } finally {
      connection.release();
    }
  }

  /**
   * Seleciona dados de uma tabela.
   * @param table Nome da tabela
   * @param columns Colunas a serem selecionadas
   * @param filters Filtros para a seleção (opcional)
   */
  public async select(
    table: string,
    columns: string,
    filters?: { [key: string]: any }[]
  ) {
    const connection = await this.pool.getConnection();
    try {
      let query = `SELECT ${columns} FROM ${table}`;
      const values: any[] = [];

      if (filters && filters.length > 0) {
        const whereClauses = filters
          .map((filter) =>
            Object.keys(filter)
              .map((key) => `${key} = ?`)
              .join(" AND ")
          )
          .join(" AND ");
        query += ` WHERE ${whereClauses}`;
        filters.forEach((filter) => values.push(...Object.values(filter)));
      }

      const [rows] = await connection.execute<RowDataPacket[]>(query, values);
      return rows.length > 0 ? rows : null;
    } catch (error) {
      console.error(`Erro ao selecionar dados da tabela ${table}:`, error);
      throw error;
    } finally {
      connection.release();
    }
  }

  /**
   * Atualiza dados em uma tabela.
   * @param table Nome da tabela
   * @param updates Dados a serem atualizados (ex: { name: 'John' })
   * @param filters Filtros para a atualização
   */
  public async update(
    table: string,
    updates: { [key: string]: any },
    filters?: { [key: string]: any }[]
  ) {
    const connection = await this.pool.getConnection();
    try {
      const updateClauses = Object.keys(updates)
        .map((key) => `${key} = ?`)
        .join(", ");
      let query = `UPDATE ${table} SET ${updateClauses}`;
      const values = [...Object.values(updates)];

      if (filters && filters.length > 0) {
        const whereClauses = filters
          .map((filter) =>
            Object.keys(filter)
              .map((key) => `${key} = ?`)
              .join(" AND ")
          )
          .join(" AND ");
        query += ` WHERE ${whereClauses}`;
        filters.forEach((filter) => values.push(...Object.values(filter)));
      }

      const [result] = await connection.execute<OkPacket>(query, values);
      return result.affectedRows > 0;
    } catch (error) {
      console.error(`Erro ao atualizar dados na tabela ${table}:`, error);
      throw error;
    } finally {
      connection.release();
    }
  }

  /**
   * Verifica se um registro existe na tabela.
   * @param table Nome da tabela
   * @param conditions Condições para verificar a existência (ex: { id: 1 })
   */
  public async exists(table: string, conditions: { [key: string]: any }) {
    const connection = await this.pool.getConnection();
    try {
      const conditionClauses = Object.keys(conditions)
        .map((key) => `${key} = ?`)
        .join(" AND ");
      const values = Object.values(conditions);

      const query = `SELECT COUNT(*) AS count FROM ${table} WHERE ${conditionClauses}`;
      const [rows] = await connection.execute<RowDataPacket[]>(query, values);

      return rows[0]?.count > 0;
    } catch (error) {
      console.error(`Erro ao verificar a existência de registros na tabela ${table}:`, error);
      throw error;
    } finally {
      connection.release();
    }
  }
}
