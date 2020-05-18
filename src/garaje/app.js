const storageServiceLocal = new StorageService({
    type: 'localStorage', //localstorage o indexedDB o dixie
    configuration: { key: 'id', db:'garaje' }
  });
 const storageServiceDixie= new StorageService({
    type: 'dixie', //localstorage o indexedDB o dixie
    configuration: { key: 'id', db:'garaje'},
    
  });
  const validation=new ValidationService();
 
 (async () => {
    try {
        await storageServiceLocal.initializeDB();
        await storageServiceDixie.initializeDB();
        const garageService = new GarageService(storageServiceLocal,storageServiceDixie);
        const garages = await garageService.loadGaragesAwait();
        const garageView = new GarageView();
        new GarageController(garageService, garageView,validation);
    } catch (error) {
        console.error(error);
   }
  })();