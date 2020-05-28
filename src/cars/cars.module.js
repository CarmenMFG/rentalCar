(async () => {
    try {
        const carService = new CarService(storageServiceLocal,storageServiceDixie,validation,httpService);
        const cars = await carService.loadCarsAwait();
        const garages=await carService.loadGaragesAwait();
        const carView = new CarView();
        new CarController(carService, carView);
    } catch (error) {
        console.error(error);
   }
  })();