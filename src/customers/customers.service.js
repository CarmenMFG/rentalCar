class CustomerService {
    constructor(local,dixie) {
        this.local=local;
        this.dixie=dixie;
        this.customers=[];
             
    } 
    async loadCustomersAwait() {
       const customers = await this.dixie.find();
      // this.customers=customers;
       this.customers = (customers || []).map(customer => new Customer(customer));
       return this.customers;
    }
    bindCustomerListChanged(callback) {
        this.onCustomerListChanged = callback;
    }

    _commit(customers) {
        this.onCustomerListChanged(customers);
    }

    addCustomer(customer) {
        console.log("en el add ",customer);
        let customerObj = new Customer(customer)
        this.customers = [...this.customers, customerObj];
        this.local.add(customerObj);
        this.dixie.add(customerObj);
        this._commit(this.customers);

    }
    findCustomerById(idCustomer) {
        return this.customers.find(({ id }) => id == idCustomer);
    }
    deleteCustomer(customer) {
        this.customers = this.customers.filter(({ id }) => id != customer.id);
        this.local.remove(customer);
        this.dixie.remove(customer);
        this._commit(this.customers);
    }
    updateCustomer(customer) {
        console.log(new Customer(customer) );
        this.customers = this.customers.map((_customer) =>
        _customer.id === customer.id ? new Customer(customer) : _customer);
        this.local.update(customer);
        this.dixie.update(customer);
        this._commit(this.customers);
    }


} 
