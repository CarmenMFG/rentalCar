const storageServiceLocal = new StorageService({
    type: 'localStorage', //localstorage o indexedDB o dixie
    configuration: { key: 'id', db:'customer' }
  });
 const storageServiceDixie= new StorageService({
    type: 'dixie', //localstorage o indexedDB o dixie
    configuration: { key: 'id', db:'customer'},
    
  });
  const validation=new ValidationService();
 
 (async () => {
    try {
        await storageServiceLocal.initializeDB();
        await storageServiceDixie.initializeDB();
        const customerService = new CustomerService(storageServiceLocal,storageServiceDixie);
        const customers = await customerService.loadCustomersAwait();
        const customerView = new CustomerView();
        new CustomerController(customerService,customerView,validation);
    } catch (error) {
        console.error(error);
   }
  })();