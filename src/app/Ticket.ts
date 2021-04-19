
import { Status } from "./status.enum";

export class Ticket{
    ticketId:number;
	travelDate:String;	
	email:String;	
    totalAmount:number;
    st:Status;
	noOfPassengers:number;

    // constructor(ticketId:number,travelDate:Date){

    //     this.ticketId=ticketId;
    //     this.travelDate=travelDate;
    // }

}