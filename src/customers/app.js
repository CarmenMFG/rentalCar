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
        const customerService = new CustomerService(storageServiceLocal,storageServiceDixie,validation,httpService);
        const customers = await customerService.loadCustomersAwait();
        const customerView = new CustomerView();
        new CustomerController(customerService,customerView);
    } catch (error) {
        console.error(error);
   }
  })();