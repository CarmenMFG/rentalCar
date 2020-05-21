class Booking {
  constructor({id,costumer,startDate,endDate,details,isDelivered}){
    this.id= id== null ? this.uuidv4() : id;
    this.costumer=costumer;
    this.startDate=startDate;
    this.endDate=endDate;
    this.details=details.map(detail=> new BookinsDetails(detail));
    this.isDelivered=isDelivered;
    this.totalPrice;//reduce de details.price

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