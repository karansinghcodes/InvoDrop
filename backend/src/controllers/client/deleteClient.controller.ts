import { Request, Response } from "express";
import prisma from "../../helpers/prismaClient";
import { response } from "../../utils/response";
import { api } from "../../routes/router";

const deleteClient = async (req: Request, res: Response) => {
  const clientId = req.params.clientId;
  const user = req.user;

  if (clientId) {
    const client = await prisma.client.findUnique({
      where: {
        id: clientId,
        userId: user.userId,
      },
    });

    if (client) {
      await prisma.client.delete({
        where: {
          id: clientId,
        },
      });

      response.ok(res, "Client Deleted Successfully", 200);
      return;
    } else {
      response.error(res, "No Client Exists With This Id", 400);
      return;
    }
  } else {
    response.error(res, "Invalid Parameters Sent", 400);
    return;
  }
};

api.delete("/delete-client/:clientId", "protected", deleteClient);
