/*let storageServiceLocal;
let storageServiceDixie;*/
const scripts =document.getElementById('scriptsClass');
let pageVisited={garages:false,cars:false,customers:false};

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
        
          fetch('http://localhost:5000/src/cars/carHTML.html').then(function(response) {
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
    fetch('http://localhost:5000/src/customers/customerHTML.html').then(function(response) {
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
    
      fetch('http://localhost:5000/src/bookings/bookingHTML.html').then(function(response) {
          return response.text()
      })
        .then(function(html) {
          document.getElementById("root").innerHTML=html;
          if (!pageVisited.bookings){
            pageVisited.cars=true;  
            insertScripts("bookings");
          }  
            insertModuleScript("bookings");
         })
         .catch(function(err) {
           console.log('Failed to fetch page: ', err);
         });
     }
}





 /* const GaragesComponent = {
 
    showComponent: () => {
     
        fetch('http://localhost:5000/src/garages/garageHTML.html').then(function(response) {
            return response.text()
         })
          .then(function(html) {
           document.getElementById("root").innerHTML=html;
           if (!pageVisited.garages){
             pageVisited.garages=true;
              let model = document.createElement('script');
              model.setAttribute("type","text/javascript")
              model.setAttribute("src",  `../shared/models/garage.model.js`);
              scripts.append(model);
            
              let view = document.createElement('script');
              view.setAttribute("type","text/javascript");
              view.setAttribute("src", `garages/garages.view.js`);
              scripts.append(view);

              let exception=document.createElement('script');
              exception.setAttribute("type","text/javascript")
              exception.setAttribute("src",`garages/garages.exceptions.js`);
              scripts.append(exception);

              let service= document.createElement('script');
              service.setAttribute("type","text/javascript");
              service.setAttribute("src",`garages/garages.service.js`);
              scripts.append(service);

              let controller=document.createElement('script');
              controller.setAttribute("type","text/javascript");
              controller.setAttribute("src",'garages/garages.controller.js');
              scripts.append(controller);
            } 
              let module=document.createElement('script');
              module.setAttribute("type","text/javascript");
              module.setAttribute("src",'garages/garages.module.js');
              scripts.append(module);
          
   
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
          if (!pageVisited.cars){
            pageVisited.cars=true;
            let model = document.createElement('script');
            model.setAttribute("type","text/javascript");
            model.setAttribute("src", `../shared/models/cars.model.js`);
            scripts.append(model);
          
            let view = document.createElement('script');
            view.setAttribute("type","text/javascript");
            view.setAttribute("src", `cars/cars.view.js`);
            scripts.append(view);

            let exception=document.createElement('script');
            exception.setAttribute("type","text/javascript");
            exception.setAttribute("src", `cars/cars.exceptions.js`);
            scripts.append(exception);

            let service= document.createElement('script');
            service.setAttribute("type","text/javascript");
            service.setAttribute("src",`cars/cars.service.js`);
            scripts.append(service);

            let controller=document.createElement('script');
            controller.setAttribute("type","text/javascript");
            controller.setAttribute("src",'cars/cars.controller.js');
            scripts.append(controller);
          }
            let module=document.createElement('script');
            module.setAttribute("type","text/javascript");
            module.setAttribute("src",'cars/cars.module.js');
            scripts.append(module);
          
      })
      .catch(function(err) {
        console.log('Failed to fetch page: ', err);
      });
  }

}*/


/*const CustomersComponent ={
  showComponent: () => {
    fetch('http://localhost:5000/src/customers/customerHTML.html').then(function(response) {
        return response.text()
     })
      .then(function(html) {
        document.getElementById("root").innerHTML=html;
   
  })
}
}*/
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
    { path: '/bookings', component: BookingsComponent, },
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

   const  insertScripts=(name)=>{
    let model = document.createElement('script');
    model.setAttribute("type","text/javascript")
    model.setAttribute("src",  `../shared/models/${name}.model.js`);
    scripts.append(model);
    let view = document.createElement('script');
    view.setAttribute("type","text/javascript");
    view.setAttribute("src", `${name}/${name}.view.js`);
    scripts.append(view);

    let exception=document.createElement('script');
    exception.setAttribute("type","text/javascript")
    exception.setAttribute("src",`${name}/${name}.exceptions.js`);
    scripts.append(exception);

    let service= document.createElement('script');
    service.setAttribute("type","text/javascript");
    service.setAttribute("src",`${name}/${name}.service.js`);
    scripts.append(service);

    let controller=document.createElement('script');
    controller.setAttribute("type","text/javascript");
    controller.setAttribute("src",`${name}/${name}.controller.js`);
    scripts.append(controller);
 
  }
  const insertModuleScript=(name)=>{
    let module=document.createElement('script');
    module.setAttribute("type","text/javascript");
    module.setAttribute("src",`${name}/${name}.module.js`);
    scripts.append(module);
  }

  window.addEventListener('hashchange', router);
  window.addEventListener('load', ()=>{router()});
 