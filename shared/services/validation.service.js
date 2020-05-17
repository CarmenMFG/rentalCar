class ValidationService{
      validateFieldText( words =[]) {
         return words.reduce((result,current)=>result &&  REGEXP.FIELDTEXT.test(current),true)
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