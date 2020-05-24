class CarsException extends Error{
    msgError={ERROR_NAMEINVALID:"Name no valid ",
    ERROR_ADDRESSINVALID:"Address no valid"}; 
    constructor(value,msg="carExceptions:Error not found"){
       super();
       this.message=this.handlerError(value,msg);
   }
   handlerError(value,msgDefault){
    const msg= Object.keys(value).reduce((msg,error)=>msg+this.msgError[error],"");
    return !msg ? msgDefault : msg;
   }
}