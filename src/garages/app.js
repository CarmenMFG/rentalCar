const storageServiceLocal = new StorageService({
    type: 'localStorage', //localstorage o indexedDB o dixie
    configuration: { key: 'id' }
  });
 const storageServiceDixie= new StorageService({
    type: 'dexie', //localstorage o indexedDB o dixie
    configuration: { key: 'id'},
    
  });
  const validation=new ValidationService();
  const httpService= new HttpService();

 (async () => {
    try {
        await storageServiceLocal.initializeDB();
        await storageServiceDixie.initializeDB();
        const garageService = new GarageService(storageServiceLocal,storageServiceDixie,validation,httpService);
        const garages = await garageService.loadGaragesAwait();
        const garageView = new GarageView();
        new GarageController(garageService, garageView);
    } catch (error) {
        console.error(error);
   }
  })();