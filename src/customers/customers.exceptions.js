class CustomersException extends Error{
    msgError={ERROR_NAMEINVALID:"Name no valid ",
    ERROR_ADDRESSINVALID:"Address no valid ",
    ERROR_DNIINVALID:"DNI no valid ",
    ERROR_PHONEINVALID:"Phone no valid ",
 }; 
    constructor(value,msg="customersExceptions:Error not found"){
       super();
       this.message=this.handlerError(value,msg);
   }
   handlerError(value,msgDefault){
    const msg= Object.keys(value).reduce((msg,error)=>msg+this.msgError[error],"");
    return !msg ? msgDefault : msg;
   }
}