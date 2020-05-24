class ValidationService{
      validateFieldText(name="") {
        // let words=Object.values(wordsObject);
        // return words.reduce((result,current)=>result &&  REGEXP.FIELDTEXT.test(current),true)
        return REGEXP.FIELDTEXT.test(name);
      }
      validateDate(date=""){
        return REGEXP.ADDRESS.test(date);
      }
      validatePhone(phone=""){
        return REGEXP.PHONE.test(phone);
      }
      validatePrice(price=""){
        return REGEXP.PRICE.test(price);
      }
    
    
}