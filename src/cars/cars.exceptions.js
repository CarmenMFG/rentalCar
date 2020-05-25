class CarsException extends Error{
    msgError={ERROR_NAMEINVALID:"Registration no valid ",
    ERROR_BRANDINVALID:"Brand no valid ",
    ERROR_MODELINVALID:"Model no valid ",
    ERROR_COLORINVALID:"Color no valid ",
    ERROR_GARAGEINVALID:"Garage no valid ",
    ERROR_PRICEINVALID:"Price no valid ",
    ERROR_GASOLINEINVALID:"Gasoline no valid "

}; 
    constructor(value,msg="carExceptions:Error not found"){
       super();
       this.message=this.handlerError(value,msg);
   }
   handlerError(value,msgDefault){
    const msg= Object.keys(value).reduce((msg,error)=>msg+this.msgError[error],"");
    return !msg ? msgDefault : msg;
   }
}