class GarageView{
    constructor(){
        this.garagesCards=document.getElementById('garagesCards');
        this.currentGarage;
        this.btnShowForm=document.getElementById("btnShowForm");
        this.manageGarages=document.getElementById("manageGarage");
       
        //Botones
        this.update=document.getElementById('update');
        this.delete=document.getElementById('delete');
        this.add=document.getElementById('add');
        this.reset=document.getElementById('reset');
        
        //Formulario
         this.txtName=document.getElementById('txtName');
         this.txtAddress=document.getElementById('txtAddress');
         this.titleForm=document.getElementById("titleForm");
         //Modal
         this.error=document.getElementById("modalMsg");


    }
    displayGarages(garages){
        this.garagesCards.innerHTML="";
        let html;
        garages.forEach((garage) => {
         html=document.createElement("tr");
         html.id=garage.id;
         html.innerHTML=`    <td>${garage.id} </td>
                             <td>${garage.address}</td>
                             <td>
                             <a class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                             <a href="#" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                             </td>`;
         this.garagesCards.append(html);   
        });                    
    }
     _resetInputs(){
        this.txtName.value="";
        this.txtAddress.value="";
        this.titleForm.innerHTML="Garages Form";
        this.currentGarage="";
        this.add.disabled=false;
        this.txtName.disabled =false;
        this.update.disabled=true;
    }
    bindAddGarage(handler){
   
        this.add.addEventListener("click",event=>{
           event.preventDefault();  
          try{
            const garage={
                    id: this.txtName.value,
                    address:this.txtAddress.value,
                    };
                handler(garage);
                this._resetInputs();
                this.manageGarages.style.display = 'none';
               
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
            this.titleForm.innerHTML="Add <b>Garage</b>";
            this.manageGarages.style.display = 'block';
            this.update.disabled=true;
            this.add.disabled=false;
           
        })
    } 
    bindDeleteGarage(handler){
        this.garagesCards.addEventListener("click",event=>{
         event.preventDefault();  
         if (event.target.parentElement.className=='delete'){
             this.currentGarage=event.target.parentElement.parentElement.parentElement.id;
             handler(this.currentGarage);
            
         }
        })  
     }
     bindClickTrUpdate(handler){
        this.garagesCards.addEventListener("click",event=>{
         event.preventDefault();  
         if (event.target.parentElement.className=='edit'){
             this.currentGarage=event.target.parentElement.parentElement.parentElement.id;
             handler(this.currentGarage);
             this.titleForm.innerHTML="Update <b>Garage</b>";
             this.txtName.disabled = true;
             this.manageGarages.style.display = 'block';
             this.add.disabled=true;
             this.update.disabled=false;
            
         }
        })  
     }
     completeForm({id,address}){
        this.txtName.value=id;
        this.txtAddress.value=address;
        
    }
    bindUpdateGarage(handler){
        this.update.addEventListener("click",event=>{
          event.preventDefault();  
          try{
            
            let garageUpdate={
                    id: this.currentGarage,
                    address:this.txtAddress.value
                }
                handler(garageUpdate);
                this._resetInputs();
                this.manageGarages.style.display = 'none';
            }
            catch (error){
                $('#modalMsg').empty();
                $('#modalMsg').append(error);
                $('#info').modal();
          
           }       
         })
    } 
  
  

}        