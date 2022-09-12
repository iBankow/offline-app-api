import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Client from "App/Models/Client";

export default class ClientsController {
  public async getAllClients({ request, response }: HttpContextContract) {
    const { page, perPage } = request.all();
    const clients = await Client.query()
      .select()
      .paginate(page || 1, perPage || 10);

    return response.send(clients);
  }

  public async createAClient({}: HttpContextContract) {}

  public async getClientById({}: HttpContextContract) {}

  public async updateClientById({}: HttpContextContract) {}

  public async deleteClientById({}: HttpContextContract) {}
}
