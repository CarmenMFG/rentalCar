class Customer {
    constructor({id,name,address,email,phone,dni,endorse}={endorse:{}}) {
      this.id= id== null ? this.uuidv4() : id;
      this.name = name;
      this.address = address;
      this.email=email;
      this.phone=phone;
      this.dni=dni;
      this.endorse=new Customer(endorse);
    }
    uuidv4() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
          (
            c ^
            (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
          ).toString(16)
        );
      }
}    