class CustomerController {

    constructor(service, view,validation) {
        this.service = service;
        this.view = view;
        this.serviceValidation=validation;
        this.view.bindAddCustomer(this.handleAddCustomer);
        this.view.bindDeleteCustomer(this.handlerDeleteCustomer);
        this.view.bindClickTrUpdate(this.handlerClickTrUpdate);
        this.view.bindUpdateCustomer(this.handlerUpdateCustomer);
        this.service.bindCustomerListChanged(this.onCustomerListChanged);
        this.view.bindResetForm();
        this.view.bindClickAddForm();
        // Display initial users
        this.onCustomerListChanged(this.service.customers);
     }
   
    onCustomerListChanged = (customers) => {
        this.view.displayCustomers(customers);
        this.view.displayEndorses(customers);
    };

    handleAddCustomer = ({name,address,phone,dni,endorse}) => {
       console.log(name,address,phone,dni,endorse);
        let valid=false;
        if (this.serviceValidation.validateFieldText({name,address,phone,dni})){
           this.service.addCustomer({name,address,phone,dni,endorse});
           valid=true;
        }
        this.view.showResponse(valid);
     };
    handlerDeleteCustomer = (idCustomer) => {
        let customer = this.service.findCustomerById(idCustomer);
        this.service.deleteCustomer(customer);
    }
    handlerClickTrUpdate = (idCustomer) => {
        let customer = this.service.findCustomerById(idCustomer);
        this.view.completeForm(customer);
    }
    handlerUpdateCustomer = ({id,name,address,phone,dni,endorse}) => {
        let valid=false;
        if (this.serviceValidation.validateFieldText({name,address,phone,dni,endorse})){ 
            this.service.updateCustomer({id,name,address,phone,dni,endorse});
            valid=true;
         }
         this.view.showResponse(valid);
    }



}
