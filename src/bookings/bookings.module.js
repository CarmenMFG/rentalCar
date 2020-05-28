(async () => {
    try {
        const bookingService = new BookingService(storageServiceLocal,storageServiceDixie,validation,httpService);
        const booking= await bookingService.loadBookingsAwait();
        const customer = await bookingService.loadCustomersAwait() 
        const cars=await bookingService.loadCarsAwait();
        const bookingView = new BookingView();
        new BookingController(bookingService, bookingView);
    } catch (error) {
        console.error(error);
   }
  })();