import { TicketService } from "../repositories/index.js";
import validationUtils from "../utils/validate.js";

export const createTicket = async (req, res) => {
  try {
    const newTicket = req.body;
    console.log(newTicket);

    if (!validationUtils.validateTicketBody) {
      return res.status(400).json({ message: "Invalid ticket body." });
    }
    const ticket = await TicketService.createTicket(newTicket);
    return res.status(200).json({ message: "Created ticket: ", ticket });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "There was an error creating a ticket." });
  }
};