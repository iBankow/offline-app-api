import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "orders";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table
        .integer("client_id")
        .references("id")
        .inTable("clients")
        .notNullable();
      table
        .integer("local_id")
        .references("id")
        .inTable("locals")
        .notNullable();
      table
        .integer("created_by")
        .references("id")
        .inTable("users")
        .notNullable();
      table
        .integer("technician_id")
        .references("id")
        .inTable("users")
        .notNullable();
      table.string("type", 45).notNullable();
      table.string("description", 255);
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
