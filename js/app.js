/*let storageServiceLocal;
let storageServiceDixie;*/
  
  const validation=new ValidationService();
  const httpService= new HttpService();
  let storageServiceLocal = new StorageService({
    type: 'localStorage', //localstorage o indexedDB o dixie
    configuration: { key: 'id' }
  });
  let storageServiceDixie= new StorageService({
    type: 'dexie', //localstorage o indexedDB o dixie
    configuration: { key: 'id'},
    
  });
  (async ()=>{
    await storageServiceLocal.initializeDB();
    await storageServiceDixie.initializeDB();
  })()

  const GaragesComponent = {
    showComponent: () => {
        fetch('http://localhost:5000/src/garages/garageHTML.html').then(function(response) {
            return response.text()
         })
          .then(function(html) {
            document.getElementById("root").innerHTML=html;
              
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
            })
            .catch(function(err) {
            console.log('Failed to fetch page: ', err);
            
            });
        
        
    }
  } 
  const CarsComponent ={
    showComponent: () => {
      fetch('http://localhost:5000/src/cars/carHTML.html').then(function(response) {
          return response.text()
       })
        .then(function(html) {
          document.getElementById("root").innerHTML=html;
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
    })
  }
}
const CustomersComponent ={
  showComponent: () => {
    fetch('http://localhost:5000/src/customers/customerHTML.html').then(function(response) {
        return response.text()
     })
      .then(function(html) {
        document.getElementById("root").innerHTML=html;
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
  })
}
}
  const HomeComponent = {
    showComponent: () => {
      document.getElementById("root").innerHTML='<div><h1>RENTAL A CAR</h1></div>';
    }
  } 
  const ErrorComponent = {
    showComponent: ()=> {
      document.getElementById("root").innerHTML='<div><h1>ERROR</h1></div>';
    }
  }
  // Routes 
const routes = [
    { path: '/', component: HomeComponent, },
    { path: '/home', component: HomeComponent, },
    { path: '/garages', component: GaragesComponent, },
    { path: '/cars', component: CarsComponent, },
    { path: '/customers', component: CustomersComponent, },
  ];

 const parseLocation = () => location.hash.slice(1).toLowerCase() || '/';
 const findComponentByPath = (path, routes) => routes.find(r => r.path.match(new RegExp(`^\\${path}$`, 'gm'))) || undefined;
 const router = () => {
    // Find the component based on the current path
    const path = parseLocation();
    console.log("path",path);
    // If there's no matching route, get the "Error" component
    const { component = ErrorComponent } = findComponentByPath(path, routes) || {};
    // TODO: Render the component in the "app" placeholder
    component.showComponent();
  };

  window.addEventListener('hashchange', router);
  window.addEventListener('load', ()=>{router()});