import { Request, Response } from "express";
import { response } from "../../utils/response";
import prisma from "../../helpers/prismaClient";
import { api } from "../../routes/router";

const updateStutusToPaid = async (req: Request, res: Response) => {
  const invoiceId = req.params.invoiceId;

  if (invoiceId) {
    await prisma.invoice.update({
      where: {
        id: invoiceId,
      },
      data: {
        status: "paid",
      },
    });

    response.ok(res, "Status Updated Successfully", 200);
    return;
  } else {
    response.error(res, "Invalid Parameter", 400);
    return;
  }
};

api.post("/update-status-paid/:invoiceId", "protected", updateStutusToPaid);
