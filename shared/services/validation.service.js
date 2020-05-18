class ValidationService{
      validateFieldText( wordsObject ={}) {
         let words=Object.values(wordsObject);
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