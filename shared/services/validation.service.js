class ValidationService{
      validateFieldText(name="") {
        return REGEXP.FIELDTEXT.test(name);
      }
      validateDate(date=""){
        return REGEXP.DATE.test(date);
      }
      validatePhone(phone=""){
        return REGEXP.PHONE.test(phone);
      }
      validateFieldNumber(price=""){
        return REGEXP.FIELDNUMBERS.test(price);
      }
      validateDNI(dni=""){
        return REGEXP.DNI.test(dni);
      }
     
    
    
}