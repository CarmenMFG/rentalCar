(async () => {
    try {
        const garageService = new GarageService(storageServiceLocal,storageServiceDixie,validation,httpService);
         const garages = await garageService.loadGaragesAwait();
        const garageView = new GarageView();
        new GarageController(garageService, garageView);
      
    } catch (error) {
        console.error(error);
   }
  })();

