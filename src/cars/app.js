const storageServiceLocal = new StorageService({
    type: 'localStorage', //localstorage o indexedDB o dixie
    configuration: { key: 'id' },
  });
 const storageServiceDixie= new StorageService({
    type: 'dixie', //localstorage o indexedDB o dixie
    configuration: { key: 'id' },
  });
  const validation=new ValidationService();
 
 (async () => {
    try {
        await storageServiceLocal.initializeDB();
        await storageServiceDixie.initializeDB();
        const carService = new CarService(storageServiceLocal,storageServiceDixie);
        // const wines = await wineService.loadWinesAwait();
        const carView = new CarView();
        new CarController(carService, carView,validation);
    } catch (error) {
        console.error(error);
    }
  })();