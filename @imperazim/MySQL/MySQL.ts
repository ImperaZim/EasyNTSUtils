import mysql, { Pool, OkPacket, RowDataPacket } from "mysql2/promise";

export interface MysqlBase {
  host?: string;
  user?: string;
  password?: string;
  database?: string;
}

export class MysqlConnection {
  private login: Pool;

  constructor(access: MysqlBase) {
    this.login = mysql.createPool(access);
  }

  public async createTableIfNotExists() {
    const login = this.login;
    const connection = await login.getConnection();
    try {
      const queries = [
        "CREATE TABLE IF NOT EXISTS server_data (id INT, total_guilds BIGINT, total_members BIGINT)",
        "CREATE TABLE IF NOT EXISTS profiles (id INT, cardinal TEXT, backpack TEXT)",
      ];

      for (const query of queries) {
        if (query) {
          await connection.query(query);
        }
      }
    } catch (error) {
      console.error("Erro durante a criação da tabela:", error);
      throw error;
    } finally {
      connection.release(); 
    }
  }

  public async insert(table: string, data: { [key: string]: any }) {
    const login = this.login;
    const connection = await login.getConnection();
    try {
      const columns = Object.keys(data).join(", ");
      const values = Object.values(data);

      const query = `INSERT INTO ${table} (${columns}) VALUES (${values
        .map(() => "?")
        .join(", ")})`;

      await connection.execute(query, values);
    } catch (error) {
      console.error("Erro ao inserir dados:", error);
      throw error;
    } finally {
      connection.release(); 
    }
  }

  public async select(
    table: string,
    column: string,
    filters?: { [key: string]: any }[]
  ) {
    try {
      const login = this.login;
      const connection = await login.getConnection();

      let query = `SELECT ${column} FROM ${table}`;

      const values: any[] = [];

      if (filters && filters.length > 0) {
        const whereClauses = filters.map((filter) =>
          Object.keys(filter)
            .map((key) => `${key} = ?`)
            .join(" AND ")
        );
        query += ` WHERE ${whereClauses.join(" AND ")}`;
        filters.forEach((filter) => {
          values.push(...Object.values(filter));
        });
      }

      const [rows] = await connection.execute<RowDataPacket[]>(query, values);

      if (rows.length > 0) {
        return rows;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Erro ao executar a consulta:", error);
      throw error;
    }
  }

  public async update(
    table: string,
    column: string,
    value: any,
    filters?: { [key: string]: any }[]
  ) {
    const login = this.login;
    const connection = await login.getConnection();
    try {
      const updateColumns = `${column} = ?`;
      let query = `UPDATE ${table} SET ${updateColumns}`;

      const values = [value];
      if (filters && filters.length > 0) {
        const whereClauses = filters.map((filter) =>
          Object.keys(filter)
            .map((key) => `${key} = ?`)
            .join(" AND ")
        );

        query += ` WHERE ${whereClauses.join(" AND ")}`;
        values.push(...filters.map((filter) => Object.values(filter)).flat());
      }

      const [result] = await connection.execute<OkPacket>(query, values);

      return result.affectedRows > 0;
    } catch (error) {
      console.error("Erro ao executar a atualização:", error);
      throw error;
    } finally {
      connection.release(); 
    }
  }

  public async exists(table: string, conditions: any) {
    const login = this.login;
    const connection = await login.getConnection();

    try {
      if (conditions) {
        const conditionKeys = Object.keys(conditions[0]);
        const conditionValues = Object.values(conditions[0]);

        const conditionString = conditionKeys
          .map((key) => `${key} = ?`)
          .join(" AND ");

        const [rows] = (await connection.execute(
          `SELECT COUNT(*) AS count FROM ${table} WHERE ${conditionString}`,
          conditionValues
        )) as RowDataPacket[];

        if (rows[0]) {
          const rowCount = rows[0].count;
          return rowCount > 0;
        }
      }
      return false;
    } catch (error) {
      console.error("Erro ao verificar a existência do usuário:", error);
      return false;
    }
  }
}