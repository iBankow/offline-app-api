import Factory from "@ioc:Adonis/Lucid/Factory";
import Client from "App/Models/Client";
import Equipment from "App/Models/Equipment";
import Item from "App/Models/Item";
import Local from "App/Models/Local";

export const ClientFactory = Factory.define(Client, ({ faker }) => {
  return {
    name: faker.company.name(),
  };
})
  .relation("locals", () => LocalFactory)
  .relation("equipments", () => EquipmentFactory)
  .relation("items", () => ItemFactory)
  .build();

export const LocalFactory = Factory.define(Local, ({ faker }) => {
  return {
    name: faker.address.street(),
    address: faker.address.streetAddress(),
    description: faker.lorem.sentence(),
  };
}).build();

export const EquipmentFactory = Factory.define(Equipment, ({ faker }) => {
  return {
    name: faker.commerce.product(),
    brand: faker.company.bsBuzz(),
    description: faker.lorem.sentence(),
  };
}).build();

export const ItemFactory = Factory.define(Item, ({ faker }) => {
  return {
    name: faker.word.verb(),
    price: Number(faker.commerce.price(10, 400, 2)),
    description: faker.lorem.sentence(),
  };
}).build();
