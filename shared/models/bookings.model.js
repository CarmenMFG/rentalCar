class Booking {
  constructor({id,customer,startDate,endDate,details,isDelivered}){
    this.id= id== null ? this.uuidv4() : id;
    this.customer=customer;
    this.startDate=startDate;
    this.endDate=endDate;
    this.details=details.map(detail=> new BookingsDetails(detail));
   // this.details=details;
    this.isDelivered=isDelivered;
    this.totalPrice=this.details.reduce((result,{price})=>result+parseInt(price),0);
   

}
uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
}
}