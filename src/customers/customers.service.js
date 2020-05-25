class CustomerService {
    CONST_CUSTOMERS_TABLE='customers';
    constructor(local,dixie,validation) {
        this.local=local;
        this.dixie=dixie;
        this.validation=validation;
        this.customers=[];
             
    } 
    async loadCustomersAwait() {
       const customers = await this.dixie.find(this.CONST_CUSTOMERS_TABLE);
      // this.customers=customers;
       this.customers = (customers || []).map(customer => new Customer(customer));
       return this.customers;
    }
    _validateData({name,address,phone,dni}){
        const errors={};
       if (!this.validation.validateFieldText(name)){
           errors.ERROR_NAMEINVALID=true;
       }
       if (!this.validation.validateFieldText(address)){
           errors.ERROR_ADDRESSINVALID=true;
       }
       if (!this.validation.validateDNI(dni)){
          errors.ERROR_DNIINVALID=true;
      }
      if (!this.validation.validatePhone(phone)){
          errors.ERROR_PHONEINVALID=true;
      }
       if (Object.keys(errors).length>0){
           throw new CustomersException(errors);
       } 
      return true;
    }


    bindCustomerListChanged(callback) {
        this.onCustomerListChanged = callback;
    }

    _commit(customers) {
        this.onCustomerListChanged(customers);
    }

    addCustomer(customer) {
        this._validateData(customer);
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
