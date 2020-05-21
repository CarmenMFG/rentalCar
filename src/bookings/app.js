const storageServiceLocal = new StorageService({
    type: 'localStorage', //localstorage o indexedDB o dixie
    configuration: { key: 'id', db:'bookings' }
  });
 const storageServiceDixie= new StorageService({
    type: 'dixie', //localstorage o indexedDB o dixie
    configuration: { key: 'id', db:'bookings'},
  });
  const storageServiceLocalCustomer = new StorageService({
    type: 'localStorage', //localstorage o indexedDB o dixie
    configuration: {key: 'id', db:'customer'}
  });
  const storageServiceLocalCar = new StorageService({
    type: 'localStorage', //localstorage o indexedDB o dixie
    configuration: { key: 'id', db:'car' }
  });

  const validation=new ValidationService();
 
 (async () => {
    try {
        await storageServiceLocal.initializeDB();
        await storageServiceDixie.initializeDB();
        await storageServiceLocalCustomer.initializeDB();
        await storageServiceLocalCar.initializeDB();
      
        const bookingService = new BookingService(storageServiceLocal,storageServiceDixie,storageServiceLocalCustomer,storageServiceLocalCar);
        const booking= await bookingService.loadBookingsAwait();
        const customer = await bookingService.loadCustomersAwait() 
       // console.log("desde el app",bookingService);
      /*  const cars=await bookingService.loadCarsAwait();*/
        const bookingView = new BookingView();
        new BookingController(bookingService, bookingView);
    } catch (error) {
        console.error(error);
   }
  })();