import { passenger } from "../passenger";
import { Ticket } from "./Ticket";

export class BookaTicketDto{
    ticket:Ticket;
    passengers:passenger[];
}