import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Client from "./Client";
import User from "./User";
import Local from "./Local";

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column({ serializeAs: "clientId" })
  public clientId: number;

  @column({ serializeAs: "localId" })
  public localId: number;

  @column({ serializeAs: "createdBy" })
  public createdBy: number;

  @column({ serializeAs: "technicianId" })
  public technicianId: number;

  @column()
  public type: "single" | "normal";

  @column()
  public description: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Client)
  public client: BelongsTo<typeof Client>;

  @belongsTo(() => Local)
  public local: BelongsTo<typeof Local>;

  @belongsTo(() => User, {
    localKey: "createdBy",
  })
  public created: BelongsTo<typeof User>;

  @belongsTo(() => User, {
    localKey: "technicianId",
  })
  public technician: BelongsTo<typeof User>;
}
