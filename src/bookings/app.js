const storageServiceLocal = new StorageService({
    type: 'localStorage', //localstorage o indexedDB o dixie
    configuration: { key: 'id' }
  });
 const storageServiceDixie= new StorageService({
    type: 'dexie', //localstorage o indexedDB o dixie
    configuration: { key: 'id'},
  });
 
 (async () => {
    try {
        await storageServiceLocal.initializeDB();
        await storageServiceDixie.initializeDB();
          
        const bookingService = new BookingService(storageServiceLocal,storageServiceDixie);
        const booking= await bookingService.loadBookingsAwait();
        const customer = await bookingService.loadCustomersAwait() 
        const cars=await bookingService.loadCarsAwait();
        const bookingView = new BookingView();
        new BookingController(bookingService, bookingView);
    } catch (error) {
        console.error(error);
   }
  })();