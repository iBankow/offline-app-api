import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.get("", "ClientsController.getAllClients");
}).prefix("clients");
