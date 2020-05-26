class BookingService {
    CONST_CUSTOMERS_TABLE='customers';
    CONST_CARS_TABLE='cars';
    CONST_BOOKINGS_TABLE='bookings';
    constructor(local,dexie,validation,httpService) {
        this.local=local;
        this.dexie=dexie;
        this.validation=validation;
        this.httpService=httpService;
        this.bookings=[];
        this.customers =[];
        this.cars=[];
        this.URL= 'http://localhost:8001/bookings';
           
    } 


    async loadBookingsAwait() {
       const bookings = await this.local.find(this.CONST_BOOKINGS_TABLE);
       this.bookings = (bookings || []).map(booking => new Booking(booking));
       return this.bookings;
    }
    async loadCustomersAwait() {
        const customers = await this.local.find(this.CONST_CUSTOMERS_TABLE);
        this.customers = (customers || []).map(customer => new Customer(customer));
        return this.customers;
     }
    async loadCarsAwait() {
        const cars = await this.local.find(this.CONST_CARS_TABLE);
        this.cars = (cars || []).map(car => new Car(car));
        return this.cars;
     }

    bindBookingListChanged(callback) {
        this.onBookingListChanged = callback;
    }

    _commit(bookings) {
        this.onBookingListChanged(bookings);
    }
    _validateData({customer,startDate,endDate,details}){
        alert(customer);
        const errors={};
       if (!this.validation.validateFieldText(customer)){
           errors.ERROR_CUSTOMERINVALID=true;
       }
      if (!this.validation.validateDate(startDate)){
           errors.ERROR_STARTDATEINVALID=true;
       }
       if (!this.validation.validateDate(endDate)){
        errors.ERROR_ENDDATEINVALID=true;
       }
       if (!this.validation.validateValidDates(startDate,endDate)){
           errors.ERROR_INTERVALDATESINVALID=true;
       }
         
       if (Object.keys(errors).length>0){
           throw new BookingsException(errors);
       } 
      return true;
    }

    addBooking(booking) {
        this._validateData(booking);
        let bookingObj = new Booking(booking);
        this.bookings = [...this.bookings, bookingObj];
        this.local.add(bookingObj,this.CONST_BOOKINGS_TABLE);
        this.dexie.add(bookingObj,this.CONST_BOOKINGS_TABLE);
        this._commit(this.bookings);
        bookingObj.startDate=moment(bookingObj.startDate).unix();
        bookingObj.endDate=moment(bookingObj.endDate).unix();
        this.httpService.post(this.URL,JSON.stringify(bookingObj));
    }
    findBookingById(idBooking) {
        return this.bookings.find(({ id }) => id == idBooking);
    }
    deleteBooking(booking) {
        this.bookings = this.bookings.filter(({ id }) => id != booking.id);
        this.local.remove(booking,this.CONST_BOOKINGS_TABLE);
        this.dexie.remove(booking,this.CONST_BOOKINGS_TABLE);
        this.httpService.delete(this.URL,JSON.stringify(booking));
        this._commit(this.bookings);
    }
    updateBooking(booking) {
        this._validateData(booking);
        this.bookings = this.bookings.map((_booking) =>
        _booking.id === booking.id ? new Booking(booking) : _booking);
        this.local.update(booking,this.CONST_BOOKINGS_TABLE);
        this.dexie.update(booking,this.CONST_BOOKINGS_TABLE);
        this._commit(this.bookings);
        booking.startDate=moment(booking.startDate).unix();
        booking.endDate=moment(booking.endDate).unix();
        this.httpService.put(this.URL,JSON.stringify(booking));
      
    }


} 
