import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "equipments";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table
        .integer("client_id")
        .references("id")
        .inTable("clients")
        .notNullable();
      table.integer("local_id").references("id").inTable("locals").nullable();
      table.uuid("code").notNullable();
      table.string("name", 45).notNullable();
      table.string("brand", 45);
      table.string("voltage", 45);
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
