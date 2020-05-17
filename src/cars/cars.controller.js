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
        this.onCarListChanged(this.service.cars);
    }
    onCarListChanged = (cars) => {
        this.view.displayCars(cars);
    };

    handleAddCar = (carObject) => {
     console.log(Object.values(carObject));
       if (this.serviceValidation.validateFieldText(Object.values(carObject))){
         this.service.addCar(carObject);
         this.view._resetInputs();
         this.view.manageCars.style.display = 'none';
       }else{
       alert("Campos no completados");
       }

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
