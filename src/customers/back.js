class CustomerView{
    constructor(){
        this.customersCards=document.getElementById('customersCards');
        this.currentCustomer;
        this.btnShowForm=document.getElementById("btnShowForm");
        this.manageCustomers=document.getElementById("manageCustomers");
       
        //Botones
        this.update=document.getElementById('update');
        this.delete=document.getElementById('delete');
        this.add=document.getElementById('add');
        this.reset=document.getElementById('reset');
        
        //Formulario
         this.txtCode=document.getElementById('txtCode');
         this.txtDNI=document.getElementById('txtDNI');
         this.txtName=document.getElementById('txtName');
         this.txtAddress=document.getElementById('txtAddress');
         this.txtPhone=document.getElementById('txtPhone');
         this.txtEndorse=document.getElementById('txtEndorse');
         this.titleForm=document.getElementById("titleForm");
     

    }
    displayCustomers(customers){
      this.customersCards.innerHTML="";
        let html;
         customers.forEach((customer) => {
         html=document.createElement("tr");
         html.id=customer.id;
         html.innerHTML=`    <td>${customer.dni}</td>
                             <td>${customer.name}</td>
                             <td>${customer.address}</td>
                             <td>${customer.phone}€</td>
                             <td-</td>
                             <td>
                                <a class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                                <a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                             </td>`;
         this.customersCards.append(html);   
        });                  
                
     }
     displayEndorses(endorses){
    /*      let optionEndorse;
          endorses.forEach((endorse)=>{
             optionEndorse =document.createElement("option");
             optionEndorse.setAttribute("value",endorse.id);
             optionEndorse.setAttribute("label",endorse.name + " - "+ endorse.dni);
             this.txtEndorse.append(optionEndorse);
      })*/
     }
     _resetInputs(){
        this.txtCode="";
        this.txtDNI="";
        this.txtName="";
        this.txtAddress="";
        this.txtPhone="";
        this.txtEndorse="";
        this.titleForm.innerHTML="Customers Form";
        this.currentCustomer="";
        this.update.disabled=false;
        this.add.disabled=false;
        this.update.disabled=true;
    }
    bindAddCustomer(handler){
          this.add.addEventListener("click",event=>{
             console.log("El input txtName",this.txtName.value);
           event.preventDefault();  
           const customer={
                 dni: this.txtDNI.value,
                 name:this.txtName.value,
                 address:this.txtAddress.value,
                 phone: this.txtPhone.value,
                // endorse:this.txtEndorse.value
                }
                console.log("Añado esto",customer);
           // handler(customer);
           
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
            this.titleForm.innerHTML="Add <b>Customer</b>";
            this.manageCustomers.style.display = 'block';
            this.update.disabled=true;
            this.add.disabled=false;
           
        })
    } 
     bindDeleteCustomer(handler){
        this.customersCards.addEventListener("click",event=>{
         event.preventDefault();  
         if (event.target.parentElement.className=='delete'){
             this.currentCustomer=event.target.parentElement.parentElement.parentElement.id;
             handler(this.currentCustomer);
            
         }
        })  
     }
     bindClickTrUpdate(handler){
        this.customersCards.addEventListener("click",event=>{
         event.preventDefault();  
         if (event.target.parentElement.className=='edit'){
             this.currentCustomer=event.target.parentElement.parentElement.parentElement.id;
             handler(this.currentCustomer);
             this.titleForm.innerHTML="Update <b>Customer</b>";
            this.manageCustomers.style.display = 'block';
             this.add.disabled=true;
             this.update.disabled=false;
            
         }
        })  
     }
     completeForm({dni,name,address,phone,endorse}){
        this.txtDNI=dni;
        this.txtName=name;
        this.txtAddress=address;
        this.txtPhone=phone;
        this.txtEndorse=endorse;
    }
    bindUpdateCustomer(handler){//OJO con el id y con el endorse!!
        this.update.addEventListener("click",event=>{
          event.preventDefault();  
            let customerUpdate={
                 id: this.currentCustomer,
                 dni: this.txtDNI.value,
                 name:this.txtName.value,
                 address:this.txtAddress.value,
                 phone: this.txtPhone.value,
                 endorse:this.txtEndorse.value
             }
             handler(customerUpdate);
         })
    } 
    showResponse(valid){
        let modal='show';
        if (valid){
            this._resetInputs();
            this.manageCustomers.style.display = 'none';
            modal='hide';
        }
         $('#info').modal(modal);	
        
    }

  

}        