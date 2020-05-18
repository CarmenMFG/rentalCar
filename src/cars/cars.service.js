class CarService {
    constructor(local,dixie,localGarage) {
        this.local=local;
        this.dixie=dixie;
        this.localGarage=localGarage;
        this.cars=[];
        this.garages=[];
        
    } 
    async loadCarsAwait() {
       const cars = await this.local.find();
      // this.cars=cars;
       this.cars = (cars || []).map(car => new Car(car));
       return this.cars;
    }
    async loadGaragesAwait(){
        const garages= await this.localGarage.find();
        this.garages = (garages||[]).map(garage => new Garage(garage));
        return this.garages;
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
