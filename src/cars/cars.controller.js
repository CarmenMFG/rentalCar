class CarController {

    constructor(service, view,validation) {
        this.service = service;
        this.view = view;
        this.serviceValidation=validation;
        this.view.bindAddCar(this.handleAddCar);
        this.view.bindDeleteCar(this.handlerDeleteCar);
        this.view.bindClickTrUpdate(this.handlerClickTrUpdate);
        this.view.bindUpdateCar(this.handlerUpdateCar);
        this.service.bindCarListChanged(this.onCarListChanged);
        this.view.bindResetForm();
        this.view.bindClickAddForm();
         // Display initial users
        // this.onCarListChanged(this.service.car);
    }
    onCarListChanged = (cars) => {
        this.view.displayCars(cars);
    };

    handleAddCar = (carObject) => {
        this.service.addCar(carObject);
    };
    handlerDeleteCar = (idCar) => {
        let car = this.service.findCarById(idCar);
        this.service.deleteCar(car);
    }
    handlerClickTrUpdate = (idCar) => {
        let car = this.service.findCarById(idCar);
        this.view.completeForm(car);
    }
    handlerUpdateCar = (car) => {
        this.service.updateCar(car);
    }



}
