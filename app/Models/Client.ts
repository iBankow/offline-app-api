import { DateTime } from "luxon";
import { BaseModel, column, HasMany, hasMany } from "@ioc:Adonis/Lucid/Orm";
import Local from "./Local";
import Item from "./Item";
import Equipment from "./Equipment";

export default class Client extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column({ serializeAs: "isActive" })
  public isActive: boolean;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => Local)
  public locals: HasMany<typeof Local>;

  @hasMany(() => Item)
  public items: HasMany<typeof Item>;

  @hasMany(() => Equipment)
  public equipments: HasMany<typeof Equipment>;
}
