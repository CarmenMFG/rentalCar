const storageServiceLocal = new StorageService({
    type: 'localStorage', //localstorage o indexedDB o dixie
    configuration: { key: 'id' }
  });
 const storageServiceDixie= new StorageService({
    type: 'dexie', //localstorage o indexedDB o dixie
    configuration: { key: 'id'},
    
  });
 const GARAGES_TABLE='garages';
 (async () => {
    try {
        await storageServiceLocal.initializeDB(GARAGES_TABLE);
        await storageServiceDixie.initializeDB(GARAGES_TABLE);
        const garageService = new GarageService(storageServiceLocal,storageServiceDixie);
        const garages = await garageService.loadGaragesAwait();
        const garageView = new GarageView();
        new GarageController(garageService, garageView);
    } catch (error) {
        console.error(error);
   }
  })();