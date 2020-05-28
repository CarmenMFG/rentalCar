class CarService {
    CONST_CARS_TABLE='cars';
    CONST_GARAGES_TABLE='garages';
    constructor(local,dixie,validation,httpService) {
        this.local=local;
        this.dixie=dixie;
        this.validation=validation;
        this.httpService=httpService;
        this.cars=[];
        this.garages=[];
        this.URL= 'http://localhost:8001/cars';
        
    } 
    async loadCarsAwait() {
       const cars = await this.local.find(this.CONST_CARS_TABLE);
      // this.cars=cars;
       this.cars = (cars || []).map(car => new Car(car));
       return this.cars;
    }
    async loadGaragesAwait(){
        const garages= await this.local.find(this.CONST_GARAGES_TABLE);
        this.garages=(garages||[]);
       // this.garages = (garages||[]).map(garage => new Garage(garage));
        return this.garages;
    }
     bindCarListChanged(callback) {
        this.onCarListChanged = callback;
    }
    _commit(cars) {
        this.onCarListChanged(cars);
    }
    _validateData({id,brand,model,color,garaje,price,gasoline}){
        const errors={};
       if (!this.validation.validateFieldText(id)){
           errors.ERROR_NAMEINVALID=true;
       }
       if (!this.validation.validateFieldText(brand)){
           errors.ERROR_BRANDINVALID=true;
       }
       if (!this.validation.validateFieldText(model)){
        errors.ERROR_MODELINVALID=true;
       }
       if (!this.validation.validateFieldText(color)){
        errors.ERROR_COLORINVALID=true;
       }
       if (!this.validation.validateFieldText(garaje)){
        errors.ERROR_GARAGEINVALID=true;
       }
       if (!this.validation.validateFieldNumber(price)){
        errors.ERROR_PRICEINVALID=true;
       }
       if (!this.validation.validateFieldNumber(gasoline)){
        errors.ERROR_GASOLINEINVALID=true;
       }
      
       if (Object.keys(errors).length>0){
           throw new CarsException(errors);
       } 
      return true;
    }


    addCar(car) {
        this._validateData(car);
        let carObj = new Car(car)
        this.cars = [...this.cars, carObj];
        this.local.add(carObj,this.CONST_CARS_TABLE);
        this.dixie.add(carObj,this.CONST_CARS_TABLE);
        this.httpService.post(this.URL,JSON.stringify(carObj));
        this._commit(this.cars);

    }
    findCarById(idCar) {
        return this.cars.find(({ id }) => id == idCar);
    }
    deleteCar(car) {
        this.cars = this.cars.filter(({ id }) => id != car.id);
        this.local.remove(car,this.CONST_CARS_TABLE);
        this.dixie.remove(car,this.CONST_CARS_TABLE);
        this.httpService.delete(this.URL,JSON.stringify(car));
        this._commit(this.cars);
   
    }
    updateCar(car) {
        this._validateData(car);
        this.cars = this.cars.map((_car) =>
        _car.id === car.id ? new Car(car) : _car);
        this.local.update(car,this.CONST_CARS_TABLE);
        this.dixie.update(car,this.CONST_CARS_TABLE);
        this.httpService.put(this.URL,JSON.stringify(car));
        this._commit(this.cars);
    }


} 
