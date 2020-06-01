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

    handleAddCustomer = (customer) => {
        console.log("controller",customer);
         this.service.addCustomer(customer);
    };
    handlerDeleteCustomer = (idCustomer) => {
        let customer = this.service.findCustomerById(idCustomer);
        this.service.deleteCustomer(customer);
    }
    handlerClickTrUpdate = (idCustomer) => {
        let customer = this.service.findCustomerById(idCustomer);
        this.view.completeForm(customer);
    }
    handlerUpdateCustomer = (customer) => {
        this.service.updateCustomer(customer);
    }



}
