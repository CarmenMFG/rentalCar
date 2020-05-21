  const storageServiceLocal = new StorageService({
    type: 'localStorage', //localstorage o indexedDB o dixie
    configuration: { key: 'id'}
  });
 const storageServiceDixie= new StorageService({
    type: 'dexie', //localstorage o indexedDB o dixie
    configuration: { key: 'id'}
  });

 
 (async () => {
    try {
        await storageServiceLocal.initializeDB();
        await storageServiceDixie.initializeDB();
        const carService = new CarService(storageServiceLocal,storageServiceDixie);
        const cars = await carService.loadCarsAwait();
        const garages=await carService.loadGaragesAwait();
        const carView = new CarView();
        new CarController(carService, carView);
    } catch (error) {
        console.error(error);
   }
  })();