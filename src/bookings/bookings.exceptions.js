class BookingsException extends Error{
    msgError={  ERROR_CUSTOMERINVALID:" Customer no valid ",
                ERROR_STARTDATEINVALID:" Start date no valid ",
                ERROR_ENDDATEINVALID:" End date no valid ",
                ERROR_DETAILS:" Reserve a car "}; 
    constructor(value,msg="bookingsExceptions:Error not found"){
       super();
       this.message=this.handlerError(value,msg);
   }
   handlerError(value,msgDefault){
    const msg= Object.keys(value).reduce((msg,error)=>msg+this.msgError[error],"");
    return !msg ? msgDefault : msg;
   }
}