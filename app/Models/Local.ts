import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Client from "./Client";

export default class Local extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column({ serializeAs: "clientId" })
  public clientId: number;

  @column()
  public name: string;

  @column()
  public address: string;

  @column()
  public description: string;

  @column({ serializeAs: "isActive" })
  public isActive: boolean;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Client)
  public client: BelongsTo<typeof Client>;
}
