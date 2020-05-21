class CustomerController {

    constructor(service, view) {
        this.service = service;
        this.view = view;
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
         this.service.addCustomer({name,address,phone,dni,endorse});
         let valid=true;
     
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
         
          this.service.updateCustomer({id,name,address,phone,dni,endorse});
          let valid=true;
          this.view.showResponse(valid);
    }



}
