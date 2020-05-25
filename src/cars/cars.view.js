class CarView{
    constructor(){
        this.carsCards=document.getElementById('carsCards');
        this.currentCar;
        this.btnShowForm=document.getElementById("btnShowForm");
        this.manageCars=document.getElementById("manageCars");
       
        //Botones
        this.update=document.getElementById('update');
        this.delete=document.getElementById('delete');
        this.add=document.getElementById('add');
        this.reset=document.getElementById('reset');
        
        //Formulario
         this.txtRegistration=document.getElementById('txtRegistration');
         this.txtBrand=document.getElementById('txtBrand');
         this.txtModel=document.getElementById('txtModel');
         this.txtColor=document.getElementById('txtColor');
         this.txtPrice=document.getElementById('txtPrice');
         this.txtGaraje=document.getElementById('txtGaraje');
         this.txtGasoline=document.getElementById('txtGasoline');
         this.titleForm=document.getElementById("titleForm");
      
    }
    displayCars(cars){
        this.carsCards.innerHTML="";
        let html;
        cars.forEach((car) => {
         html=document.createElement("tr");
         html.id=car.id;
         html.innerHTML=`    <td>${car.id} </td>
                             <td>${car.brand}</td>
                             <td>${car.model}</td>
                             <td>${car.color}</td>
                             <td>${car.price}€</td>
                             <td>${car.gasoline}</td>
                             <td>${car.garaje}</td>
                             <td>
                             <a class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                             <a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                             </td>`;
         this.carsCards.append(html);   
        });                    
                
     }
     displayGarages(garages){
         let html;
         this.txtGaraje.innerHTML="";
         garages.forEach((garage)=>{
            html =document.createElement("option");
            html.innerHTML=garage.id;
            this.txtGaraje.append(html);
        })
      
     }
     _resetInputs(){
        this.txtRegistration.value="";
        this.txtBrand.value="";
        this.txtModel.value="";
        this.txtColor.value="";
        this.txtPrice.value="";
        this.txtGaraje.value="";
        this.txtGasoline.value="";
        this.titleForm.innerHTML="Cars Form";
        this.currentCar="";
        this.update.disabled=false;
        this.add.disabled=false;
        this.txtRegistration.disabled =false;
        this.update.disabled=true;
    }
    bindAddCar(handler){
   
        this.add.addEventListener("click",event=>{
           event.preventDefault();  
            try{
            const car={
                    id: this.txtRegistration.value,
                    brand:this.txtBrand.value,
                    model:this.txtModel.value,
                    color:this.txtColor.value,
                    price:this.txtPrice.value,
                    gasoline:this.txtGasoline.value,
                    garaje:this.txtGaraje.value
                    }
               handler(car);
               this._resetInputs();
               this.manageCars.style.display = 'none';
            }
            catch (error){
                $('#modalMsg').empty();
                $('#modalMsg').append(error);
                $('#info').modal();
           } 
           
        })
    }
    bindResetForm(){
        this.reset.addEventListener("click",event=>{
            event.preventDefault(); 
            this._resetInputs();  
        })
    }
    bindClickAddForm(){
        this.btnShowForm.addEventListener("click",event=>{
            event.preventDefault();  
            this._resetInputs();  
            this.titleForm.innerHTML="Add <b>Car</b>";
            this.manageCars.style.display = 'block';
            this.update.disabled=true;
            this.add.disabled=false;
           
        })
    } 
    bindDeleteCar(handler){
        this.carsCards.addEventListener("click",event=>{
         event.preventDefault();  
         if (event.target.parentElement.className=='delete'){
             this.currentCar=event.target.parentElement.parentElement.parentElement.id;
             handler(this.currentCar);
            
         }
        })  
     }
     bindClickTrUpdate(handler){
        this.carsCards.addEventListener("click",event=>{
         event.preventDefault();  
         if (event.target.parentElement.className=='edit'){
             this.currentCar=event.target.parentElement.parentElement.parentElement.id;
             handler(this.currentCar);
             this.titleForm.innerHTML="Update <b>Car</b>";
             this.txtRegistration.disabled = true;
             this.manageCars.style.display = 'block';
             this.add.disabled=true;
             this.update.disabled=false;
            
         }
        })  
     }
     completeForm({id,brand,model,color,price,gasoline,garaje}){
        this.txtRegistration.value=id;
        this.txtBrand.value=brand;
        this.txtModel.value=model;
        this.txtColor.value=color;
        this.txtPrice.value=price;
        this.txtGasoline.value=gasoline;
        this.txtGaraje.value=garaje;
    }
    bindUpdateCar(handler){
        this.update.addEventListener("click",event=>{
          event.preventDefault();  
           try{
             let carUpdate={
                 id: this.currentCar,
                 brand:this.txtBrand.value,
                 model:this.txtModel.value,
                 color:this.txtColor.value,
                 price:this.txtPrice.value,
                 gasoline: this.txtGasoline.value,
                 garaje:this.txtGaraje.value
             }
             handler(carUpdate);
             this._resetInputs();
             this.manageCars.style.display = 'none';
          }
          catch (error){
              $('#modalMsg').empty();
              $('#modalMsg').append(error);
              $('#info').modal();
         } 
      })
    } 
    showResponse(valid){
        let modal='show';
        if (valid){
            this._resetInputs();
            this.manageCars.style.display = 'none';
            modal='hide';
        }
         $('#info').modal(modal);	
        
    }

  

}        