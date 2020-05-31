/*let storageServiceLocal;
let storageServiceDixie;*/
const scripts =document.getElementById('scriptsClass');
let pageVisited={garages:false,cars:false,customers:false,bookings:false};

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
     
        fetch('http://localhost:5000/src/garages/garages.html').then(function(response) {
            return response.text()
         })
          .then(function(html) {
           document.getElementById("root").innerHTML=html;
           if (!pageVisited.garages){
             pageVisited.garages=true;
             insertScripts("garages");
           }  
            insertModuleScript("garages");
          })
          .catch(function(err) {
            console.log('Failed to fetch page: ', err);
          });
      }
    
    }
const CarsComponent ={

      showComponent: () => {
        
          fetch('http://localhost:5000/src/cars/cars.html').then(function(response) {
              return response.text()
          })
            .then(function(html) {
              document.getElementById("root").innerHTML=html;
              if (!pageVisited.cars){
                pageVisited.cars=true;  
                insertScripts("cars");
              }  
                insertModuleScript("cars");
             })
             .catch(function(err) {
               console.log('Failed to fetch page: ', err);
             });
         }
 }
 const CustomersComponent ={
  showComponent: () => {
    fetch('http://localhost:5000/src/customers/customers.html').then(function(response) {
        return response.text()
     })
      .then(function(html) {
        document.getElementById("root").innerHTML=html;
        if (!pageVisited.customers){
          pageVisited.customers=true;  
          insertScripts("customers");
        }  
         insertModuleScript("customers");
       })
       .catch(function(err) {
         console.log('Failed to fetch page: ', err);
       });
   }
}
const BookingsComponent ={

  showComponent: () => {
    
      fetch('http://localhost:5000/src/bookings/bookings.html').then(function(response) {
          return response.text()
      })
        .then(function(html) {
          document.getElementById("root").innerHTML=html;
          if (!pageVisited.bookings){
            pageVisited.bookings=true;  
            insertScripts("bookings");
          }  
            insertModuleScript("bookings");
         })
         .catch(function(err) {
           console.log('Failed to fetch page: ', err);
         });
     }
}


  const HomeComponent = {
    showComponent: () => {
      document.getElementById("root").innerHTML='<div class="mt-5"><h1>WELCOME</h1></div>';
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
    { path: '/bookings', component: BookingsComponent, },
  ];

 const parseLocation = () => location.hash.slice(1).toLowerCase() || '/';
 const findComponentByPath = (path, routes) => routes.find(r => r.path.match(new RegExp(`^\\${path}$`, 'gm'))) || undefined;
 const router = () => {
    // Find the component based on the current path
    const path = parseLocation();
     // If there's no matching route, get the "Error" component
    const { component = ErrorComponent } = findComponentByPath(path, routes) || {};
    // TODO: Render the component in the "app" placeholder
    component.showComponent();
  };

 const  insertScripts=(name)=>{
    let model = document.createElement('script');
    model.setAttribute("type","text/javascript")
    model.setAttribute("src",  `../shared/models/${name}.model.js`);
    scripts.append(model);
    let view = document.createElement('script');
    view.setAttribute("type","text/javascript");
    view.setAttribute("src", `${name}/${name}.view.js`);
    view.async = false;
    scripts.append(view);

    let exception=document.createElement('script');
    exception.setAttribute("type","text/javascript")
    exception.setAttribute("src",`${name}/${name}.exceptions.js`);
    exception.async = false;
    scripts.append(exception);

    let service= document.createElement('script');
    service.setAttribute("type","text/javascript");
    service.setAttribute("src",`${name}/${name}.service.js`);
    service.async = false;
    scripts.append(service);

    let controller=document.createElement('script');
    controller.setAttribute("type","text/javascript");
    controller.setAttribute("src",`${name}/${name}.controller.js`);
    controller.async = false;
    scripts.append(controller);
 
  }
  const insertModuleScript=(name)=>{
    let module=document.createElement('script');
    module.setAttribute("type","text/javascript");
    module.setAttribute("src",`${name}/${name}.module.js`);
    module.async = false;
    scripts.append(module);
  }

  window.addEventListener('hashchange', router);
  window.addEventListener('load', ()=>{router()});
 