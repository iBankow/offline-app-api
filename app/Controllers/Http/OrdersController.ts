import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Order from "App/Models/Order";
import { schema, rules } from "@ioc:Adonis/Core/Validator";

const createOrderValidator = schema.create({
  clientId: schema.number([
    rules.exists({
      table: "clients",
      column: "id",
    }),
  ]),
  localId: schema.number([
    rules.exists({
      table: "locals",
      column: "id",
    }),
  ]),
  technicianId: schema.number.optional([
    rules.exists({
      table: "users",
      column: "id",
    }),
  ]),
  type: schema.enum(["single", "normal"] as const),
  description: schema.string.optional(),
});

export default class OrdersController {
  public async getAllOrders({ request, response }: HttpContextContract) {
    const { page, perPage } = request.all();
    const orders = await Order.query()
      .select()
      .paginate(page || 1, perPage || 10);

    return response.send(orders);
  }

  public async getTechnicianOrders({ response, auth }: HttpContextContract) {
    const { user } = auth;

    const orders = await Order.query()
      .select()
      .preload("local")
      .preload("client")
      .where((build) => {
        build.where("technician_id", user!.id);
      });

    response.send(orders);
  }

  public async createOrder({ request, response, auth }: HttpContextContract) {
    const { user } = auth;
    const payload = await request.validate({ schema: createOrderValidator });

    const order = new Order();

    await order.merge({ ...payload, createdBy: user!.id }).save();

    return response.status(201).send(order);
  }

  public async getOrderById({ params, response }: HttpContextContract) {
    const { orderId } = params;

    const order = await Order.findOrFail(orderId);

    await order.load("client");
    await order.load("local");

    return response.send(order);
  }

  public async updateClientById({}: HttpContextContract) {}

  public async deleteClientById({}: HttpContextContract) {}
}
