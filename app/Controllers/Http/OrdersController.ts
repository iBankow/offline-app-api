import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Order from "App/Models/Order";

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

  public async createAClient({}: HttpContextContract) {}

  public async getClientById({}: HttpContextContract) {}

  public async updateClientById({}: HttpContextContract) {}

  public async deleteClientById({}: HttpContextContract) {}
}
