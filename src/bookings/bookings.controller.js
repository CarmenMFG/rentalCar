class BookingController {

    constructor(service, view) {
        this.service = service;
        this.view = view;
        this.view.bindAddbooking(this.handleAddBooking);
        this.view.bindDeleteBooking(this.handlerDeleteBooking);
        this.view.bindClickTrUpdate(this.handlerClickTrUpdate);
        this.view.bindUpdateBooking(this.handlerUpdateBooking);
        this.service.bindBookingListChanged(this.onBookingListChanged);
        this.view.bindResetForm();
        this.view.bindClickAddForm();
        // Display initial users
        this.onBookingListChanged(this.service.bookings);
      /*  this.onCustomerListChanged(this.service.customers);
        this.onCarListChanged(this.service.cars);*/
     }
   
    onBookingListChanged = (bookings) => {
        this.view.displayBookings(bookings);
    };
    /*  onCustomerListChanged = (customers) => {
        this.view.displayCustomers(customers);
    };
   onCarListChanged = (cars) => {
        this.view.displayCars(cars);
    };*/

    handleAddBooking = ({customer,startDate,endDate,details,isDelivered}) => {
           this.service.addBooking({customer,startDate,endDate,details,isDelivered});
           valid=true;
           this.view.showResponse(valid);
     };
    handlerDeleteBooking = (idBooking) => {
        let booking = this.service.findBookingById(idBooking);
        this.service.deleteBooking(booking);
    }
    handlerClickTrUpdate = (idBooking) => {
        let booking = this.service.findBookingById(idBooking);
        this.view.completeForm(booking);
    }
    handlerUpdateBooking = ({id,customer,startDate,endDate,details,isDelivered}) => {
         this.service.updateBooking({id,customer,startDate,endDate,details,isDelivered});
         valid=true;
         this.view.showResponse(valid);
    }



}
