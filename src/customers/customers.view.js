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
        //Modal
         this.info=document.getElementById("#id");

    }
    displayCustomers(customers){
        console.log(customers);
        this.customersCards.innerHTML="";
        let html;
        customers.forEach((customer) => {
         html=document.createElement("tr");
         html.id=customer.id;
         html.innerHTML=`    <td>${customer.dni}</td>
                             <td>${customer.name}</td>
                             <td>${customer.address}</td>
                             <td>${customer.phone}€</td>
                             <td>${customer.endorse}</td>
                             <td>
                             <a class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                             <a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                             </td>`;
         this.customersCards.append(html);   
        });                    
                
     }
     
     displayEndorses(endorses){//cuando se elige en el option un endorse se coge el DNI
         console.log("Estoy en display",endorses);  
         let optionEndorse;
           //Hay q borrar todos los options..Acordarse
           this.txtEndorse.innerHTML="";
             endorses.forEach((endorse)=>{
                optionEndorse =document.createElement("option");
                optionEndorse.setAttribute("value",endorse.dni);
                optionEndorse.innerText=endorse.name + " - "+ endorse.dni;
                this.txtEndorse.append(optionEndorse);
          })
         }
     _resetInputs(){
        this.txtCode.value="";
        this.txtDNI.value="";
        this.txtName.value="";
        this.txtAddress.value="";
        this.txtPhone.value="";
        this.txtEndorse.value="";
        this.titleForm.innerHTML="Customers Form";
        this.currentCustomer="";
        this.update.disabled=false;
        this.add.disabled=false;
        this.update.disabled=true;
    }
    bindAddCustomer(handler){
        this.add.addEventListener("click",event=>{
           event.preventDefault();  
          try{
           const customer={
                     dni:this.txtDNI.value,
                     name:this.txtName.value,
                     address:this.txtAddress.value,
                     phone:this.txtPhone.value,
                     endorse:this.txtEndorse.value
                }
                handler(customer);
                this._resetInputs();
                this.manageCustomers.style.display = 'none';
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
     completeForm({id,name,address,phone,dni,endorse}){
        this.txtCode.value=id;
        this.txtDNI.value=dni;
        this.txtName.value=name;
        this.txtAddress.value=address;
        this.txtPhone.value=phone;
        this.txtEndorse.value=endorse;
    }
    bindUpdateCustomer(handler){
        this.update.addEventListener("click",event=>{
          event.preventDefault();  
            let customerUpdate={
                 id: this.currentCustomer,
                 dni:this.txtDNI.value,
                 name:this.txtName.value,
                 address:this.txtAddress.value,
                 phone:this.txtPhone.value,
                 endorse:this.txtEndorse.value
             }
             handler(customerUpdate);
             this._resetInputs();
             this.manageCustomers.style.display = 'none';
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