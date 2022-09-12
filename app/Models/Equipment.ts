import { DateTime } from "luxon";
import {
  BaseModel,
  beforeCreate,
  BelongsTo,
  belongsTo,
  column,
} from "@ioc:Adonis/Lucid/Orm";
import { v4 as uuid } from "uuid";
import Client from "./Client";
import Local from "./Local";

export default class Equipment extends BaseModel {
  public static table = "equipments";

  @column({ isPrimary: true })
  public id: number;

  @column({ serializeAs: "clientId" })
  public clientId: number;

  @column({ serializeAs: "localId" })
  public localId: number;

  @column()
  public code: string;

  @column()
  public name: string;

  @column()
  public brand: string;

  @column()
  public voltage: string;

  @column()
  public description: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeCreate()
  public static async createUUID(model: Equipment) {
    model.code = uuid();
  }

  @belongsTo(() => Client)
  public client: BelongsTo<typeof Client>;

  @belongsTo(() => Local)
  public local: BelongsTo<typeof Local>;
}
