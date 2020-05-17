class CarService {
    constructor(local,dixie) {
        this.local=local;
        this.dixie=dixie;
        this.cars=[];
        
    }    
    bindCarListChanged(callback) {
        this.onCarListChanged = callback;
    }
    _commit(cars) {
        this.onCarListChanged(cars);
    }
    addCar(car) {
        let carObj = new Car(car)
        this.cars = [...this.cars, carObj];
       // this.storageService.add(wineObj);
        this._commit(this.cars);

    }
    findCarById(idCar) {
        return this.cars.find(({ id }) => id == idCar);
    }
    deleteCar(car) {
        this.cars = this.cars.filter(({ id }) => id != car.id);
        //this.storageService.remove(wine);
        this._commit(this.cars);
    }
    updateCar(car) {
        console.log("en el servico",car);
        console.log("en el servico",new Car(car) );
        console.log("original",this.cars );
        this.cars = this.cars.map((_car) =>
        _car.id === car.id ? new Car(car) : _car);
        //this.storageService.update(car);
        console.log("modificado",this.cars );
        this._commit(this.cars);
    }


} 
