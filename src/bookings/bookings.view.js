class BookingView{
    constructor(){
        this.bookingsCards=document.getElementById('bookingsCards');
        this.currentBooking;
        this.btnShowForm=document.getElementById("btnShowForm");
        this.manageBookings=document.getElementById("manageBooking");
        this.cars=document.getElementById("cars");// Tabla de las cars Pairing cdo hace el updat
        this.listReservedCars=[];

       //Formulario
       this.titleForm=document.getElementById("titleForm");
        this.txtCustomer=document.getElementById('txtCustomer');
        this.txtStartDate=document.getElementById('txtStartDate');
        this.txtEndDate=document.getElementById('txtEndDate');
      
        //Botones
        this.update=document.getElementById('update');
        this.delete=document.getElementById('delete');
        this.add=document.getElementById('add');
        this.reset=document.getElementById('reset');
      
        //Modal de añadir Coche
       this.addCar=document.getElementById("addCar");
       this.modalIdCar=document.getElementById("modalIdCar");
       this.btnAddCar=document.getElementById("btnAddCar");
  }
  
  displayBookings(bookings){
       //borro todos los vinos
        this.bookingsCards.innerHTML="";
       //Escribir todos los vinos..
        let htmlBooking;
        bookings.forEach((booking) => {
            htmlBooking=document.createElement("tr");
            htmlBooking.id=booking.id;
            let listCar=""; //Para mostrar las matrículas de los coches reservados
            for (let car of booking.details){
            listCar+=car.id + " ";
            }
            htmlBooking.innerHTML=` <td>${booking.customer}</td>
                                    <td>${booking.startDate}</td>
                                    <td>${booking.endDate}</td>
                                    <td>${listCar}</td>
                                    <td>${booking.price}€</td>
                                    <td>
                                    <a class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                                    <a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                                    </td>`;
            this.bookingsCards.append(htmlBooking);   
        });                    
               
    }
  displayCustomers(customers){//cuando se elige en el option un customer se coge el DNI
        let optionCustomer;
        this.txtCustomer.innerHTML="";
         customers.forEach((customer)=>{
            optionCustomer =document.createElement("option");
            optionCustomer.setAttribute("value",customer.dni);
            optionCustomer.setAttribute("label",customer.name + " - "+ customer.dni);
        this.txtCustomer.append(optionCustomer);
      })
     }
   /*  displayCars(cars){//cuando se elige en el option un car se coge el stringfy de
        let optionCar;
        this.txtCar.innerHTML="";
         cars.forEach((car)=>{
            optionCar =document.createElement("option");
            optionCar.setAttribute("value",JSON.stringify(car));
            optionCar.setAttribute("label",car.id+ " - "+ car.brand + car.model);
        this.txtCar.append(optionCar);
      })
     }*/
    
    _resetInputs(){
        this.txtCustomer.value="";
        this.txtStartDate.value="";
        this.txtEndDate.value="";
        this.currentBooking="";
        this.titleForm.innerHTML="Bookings Form";
        this.update.disabled=false;
        this.add.disabled=false;
        this.listReservedCars=[];
        this.cars.innerHTML="";
       
    }

    
  bindAddbooking(handler){
   
        this.add.addEventListener("click",event=>{
           event.preventDefault();  
           const booking={
                id:null,
                customer : this.txtCustomer.value,
                startDate : this.txtStartDate.value,
                endDate : this.txtEndDate.value,
                isDelivered: true,
                details :this.listReservedCars
            }
            handler(booking);
            this._resetInputs();
            this.manageBookings.style.display = 'none';
        })
    }
    bindResetForm(){
        this.reset.addEventListener("click",event=>{
            event.preventDefault(); 
            this._resetInputs();  
        })
    }
    bindClickTrUpdate(handler){
        this.bookingsCards.addEventListener("click",event=>{
         event.preventDefault();  
         if (event.target.parentElement.className=='edit'){
             this.currentBooking=event.target.parentElement.parentElement.parentElement.id;
             console.log("el booking es"+this.currentBooking);
             handler(this.currentBooking);
             this.titleForm.innerHTML="Update <b>Booking</b>";
             this.manageBookings.style.display = 'block';
             this.add.disabled=true;
             this.update.disabled=false;
            
         }
        })  
     }
     bindDeleteBooking(handler){
        this.bookingsCards.addEventListener("click",event=>{
         event.preventDefault();  
         if (event.target.parentElement.className=='delete'){
             this.currentBooking=event.target.parentElement.parentElement.parentElement.id;
             handler(this.currentBooking);
            
         }
        })  
     }

 
   completeForm({customer,startDate,endDate,details,isDelivered}){
        this.txtCustomer.value=customer;
        this.txtStartDate.value=startDate;
        this.txtEndDate.value=endDate;
       //this.listReservedCars=foodPairing.map(({id,...rest}) => ({...rest}));
        this.listReservedCars=details;
        this.completeTableCars();

    }
    completeTableCars(){
        this.cars.innerHTML="";
        let htmlCar;
        this.listReservedCars.forEach((car) => {
        htmlCar=document.createElement("tr");
        htmlCar.innerHTML=`<td><b>${car.id}</b></td>
                             <td>${car.price}</td>
                             <td>${car.gasoline}</td>
                             <td>
                             <i id="${car.id}" class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
                             </td>`;
         this.cars.append(htmlCar);   
        });                   

    }
    bindDeletecar(){
       this.cars.addEventListener("click",event=>{
       event.preventDefault();  
       let idCar=event.target.id;
       this.listReservedCars=this.listReservedCars.filter(({id})=>id!==idCar);
       this.completeTableCars();
     }) 
    }
  
 bindUpdateBooking(handler){
        this.update.addEventListener("click",event=>{
          event.preventDefault();  
          console.log("La lista de coches alquilados"+JSON.stringify(this.listReservedCars));
            let bookingUpdate={
                 id: this.currentBooking,
                 customer : this.txtCustomer.value,
                 startDate: this.startDate,
                 endDate:this.endDate,
                 isDelivered:false,//Estoy hay q cambiarlo por un check acordarse!!!
                 details : this.listReservedCars
             }
           
             handler(bookingUpdate);
             this._resetInputs();
             this.manageBookings.style.display = 'none';
 
         })
    } 
    bindClickAddForm(){
        this.btnShowForm.addEventListener("click",event=>{
            event.preventDefault();  
            this._resetInputs();  
            this.titleForm.innerHTML="Add <b>Booking</b>";
            this.manageBookings.style.display = 'block';
            this.update.disabled=true;
            this.add.disabled=false;
           
        })
    } 
    bindAddCar(){
        this.btnAddCar.addEventListener("click",event=>{
            event.preventDefault();  
            const car={
                id :  this.modalNameFood.value
              /*  price : this.modalkcalFood.value,
                gasoline : this.chkVegan.checked,*/
                          
            }
           this._deleteFieldsAddCarModal();
           $('#addCar').modal('hide');
           this.listReservedCars=[...this.listReservedCars,car]; 
           this.completeTableCars();
        }
        )
    }
    _deleteFieldsAddFoodModal(){
		this.modalIdCar.value = ""; 
     }
  
}
    
 