(async () => {
    try {
      const customerService = new CustomerService(storageServiceLocal,storageServiceDixie,validation,httpService);
      const customers = await customerService.loadCustomersAwait();
      const customerView = new CustomerView();
      new CustomerController(customerService,customerView);
    } catch (error) {
        console.error(error);
   }
  })();