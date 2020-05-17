class CarService {
    constructor(local,dixie) {
        this.local=local;
        this.dixie=dixie;
        this.cars=[];
        
    } 
    async loadCarsAwait() {
        console.log(this.dixie);
       const cars = await this.dixie.find();
       console.log("cars",cars);
       this.cars=cars;
      // this.cars = (cars || []).map(car => new Car(car));
       return this.cars;
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
        this.local.add(carObj);
        this.dixie.add(carObj);
        this._commit(this.cars);

    }
    findCarById(idCar) {
        return this.cars.find(({ id }) => id == idCar);
    }
    deleteCar(car) {
        this.cars = this.cars.filter(({ id }) => id != car.id);
        this.local.remove(car);
        this.dixie.remove(car);
        this._commit(this.cars);
    }
    updateCar(car) {
        console.log(new Car(car) );
        this.cars = this.cars.map((_car) =>
        _car.id === car.id ? new Car(car) : _car);
        this.local.update(car);
        this.dixie.update(car);
        this._commit(this.cars);
    }


} 
