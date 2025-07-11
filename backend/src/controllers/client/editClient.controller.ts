import { Request, Response } from "express";
import { z } from "zod";
import { addClientSchema } from "../../validations/client/addClientSchema";
import { response } from "../../utils/response";
import prisma from "../../helpers/prismaClient";
import { api } from "../../routes/router";

type clientDataType = z.infer<typeof addClientSchema>;

const editClient = async (req: Request, res: Response) => {
  const client: clientDataType = req.body;
  const clientId = req.params.clientId;

  const requestValidation = addClientSchema.safeParse(client);

  if (requestValidation.success && clientId) {
    const updatedClient = await prisma.client.update({
      where: {
        id: clientId,
      },
      data: client,
    });

    if (updatedClient) {
      response.ok(res, "Client Successfully Updated", 200);
      return;
    } else {
      response.error(res, "Failed To Update Client", 400);
      return;
    }
  } else {
    response.error(res, "Invalid Data Sent", 400);
  }
};

api.put("/edit-client/:clientId", "protected", editClient);
