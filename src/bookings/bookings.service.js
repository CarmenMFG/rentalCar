class BookingService {
    CONST_CUSTOMERS_TABLE='customers';
    CONST_CARS_TABLE='cars';
    CONST_BOOKINGS_TABLE='bookings';
    constructor(local,dexie) {
        this.local=local;
        this.dexie=dexie;
        
        this.bookings=[];
        this.customers =[];
        this.cars=[];
           
    } 


    async loadBookingsAwait() {
       const bookings = await this.local.find(this.CONST_BOOKINGS_TABLE);
      // this.bookings=bookings;
       this.bookings = (bookings || []).map(booking => new Booking(booking));
       return this.bookings;
    }
    async loadCustomersAwait() {
        const customers = await this.local.find(this.CONST_CUSTOMERS_TABLE);
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
        this.local.add(bookingObj,this.CONST_BOOKINGS_TABLE);
        this.dexie.add(bookingObj,this.CONST_BOOKINGS_TABLE);
        this._commit(this.bookings);

    }
    findBookingById(idBooking) {
        return this.bookings.find(({ id }) => id == idBooking);
    }
    deleteBooking(booking) {
        this.bookings = this.bookings.filter(({ id }) => id != booking.id);
        this.local.remove(booking,this.CONST_BOOKINGS_TABLE);
        this.dexie.remove(booking,this.CONST_BOOKINGS_TABLE);
        this._commit(this.bookings);
    }
    updateBooking(booking) {
        console.log(new Booking(booking) );
        this.bookings = this.bookings.map((_booking) =>
        _booking.id === booking.id ? new Booking(booking) : _booking);
        this.local.update(booking,this.CONST_BOOKINGS_TABLE);
        this.dexie.update(booking,this.CONST_BOOKINGS_TABLE);
        this._commit(this.bookings);
    }


} 
