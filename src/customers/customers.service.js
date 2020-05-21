class CustomerService {
    CONST_CUSTOMERS_TABLE='customers';
    constructor(local,dixie) {
        this.local=local;
        this.dixie=dixie;
        this.customers=[];
             
    } 
    async loadCustomersAwait() {
       const customers = await this.dixie.find(this.CONST_CUSTOMERS_TABLE);
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
        let customerObj = new Customer(customer)
        this.customers = [...this.customers, customerObj];
        this.local.add(customerObj,this.CONST_CUSTOMERS_TABLE);
        this.dixie.add(customerObj,this.CONST_CUSTOMERS_TABLE);
        this._commit(this.customers);

    }
    findCustomerById(idCustomer) {
        return this.customers.find(({ id }) => id == idCustomer);
    }
    deleteCustomer(customer) {
        this.customers = this.customers.filter(({ id }) => id != customer.id);
        this.local.remove(customer,this.CONST_CUSTOMERS_TABLE);
        this.dixie.remove(customer,this.CONST_CUSTOMERS_TABLE);
        this._commit(this.customers);
    }
    updateCustomer(customer) {
        this.customers = this.customers.map((_customer) =>
        _customer.id === customer.id ? new Customer(customer) : _customer);
        this.local.update(customer,this.CONST_CUSTOMERS_TABLE);
        this.dixie.update(customer,this.CONST_CUSTOMERS_TABLE);
        this._commit(this.customers);
    }


} 
