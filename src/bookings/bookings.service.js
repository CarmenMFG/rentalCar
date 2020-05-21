class BookingService {
    constructor(local,dixie,localCustomer,localCar) {
        this.local=local;
        this.dixie=dixie;
        this.localCustomer=localCustomer;
        this.localCar=localCar;
        this.bookings=[];
        this.customers =[];
        this.cars=[];
             
    } 
    async loadBookingsAwait() {
       const bookings = await this.local.find();
      // this.bookings=bookings;
       this.bookings = (bookings || []).map(booking => new Booking(booking));
       return this.bookings;
    }
    async loadCustomersAwait() {
        const customers = await this.local.find();
        console.log ("Desde el service",customers);
       // this.bookings=bookings;
        this.customers = (customers || []).map(customer => new Booking(customer));
        return this.customers;
     }
    /* async loadCarsAwait() {
        const cars = await this.local.find();
       // this.bookings=bookings;
        this.cars = (cars || []).map(car => new Booking(car));
        return this.cars;
     }*/

    bindBookingListChanged(callback) {
        this.onBookingListChanged = callback;
    }

    _commit(bookings) {
        this.onBookingListChanged(bookings);
    }

    addBooking(booking) {
        console.log("en el add ",booking);
        let bookingObj = new Booking(booking)
        this.bookings = [...this.bookings, bookingObj];
        this.local.add(bookingObj);
        this.dixie.add(bookingObj);
        this._commit(this.bookings);

    }
    findBookingById(idBooking) {
        return this.bookings.find(({ id }) => id == idBooking);
    }
    deleteBooking(booking) {
        this.bookings = this.bookings.filter(({ id }) => id != booking.id);
        this.local.remove(booking);
        this.dixie.remove(booking);
        this._commit(this.bookings);
    }
    updateBooking(booking) {
        console.log(new Booking(booking) );
        this.bookings = this.bookings.map((_booking) =>
        _booking.id === booking.id ? new Booking(booking) : _booking);
        this.local.update(booking);
        this.dixie.update(booking);
        this._commit(this.bookings);
    }


} 
