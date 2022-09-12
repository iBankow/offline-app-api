import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import { ClientFactory } from "Database/factories";

export default class extends BaseSeeder {
  public async run() {
    await ClientFactory.with("locals", 5)
      .with("items", 100)
      .with("equipments", 20)
      .create();
    // Write your database queries inside the run method
  }
}
