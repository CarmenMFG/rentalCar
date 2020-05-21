class CarController {

    constructor(service, view) {
        this.service = service;
        this.view = view;
        this.view.bindAddCar(this.handleAddCar);
        this.view.bindDeleteCar(this.handlerDeleteCar);
        this.view.bindClickTrUpdate(this.handlerClickTrUpdate);
        this.view.bindUpdateCar(this.handlerUpdateCar);
        this.service.bindCarListChanged(this.onCarListChanged);
        this.view.bindResetForm();


        this.view.bindClickAddForm();
        // Display initial users
        this.onCarListChanged(this.service.cars);
        this.onGarageListChanged(this.service.garages);
    }
    onGarageListChanged=(garages)=>{
        this.view.displayGarages(garages);
    }
    onCarListChanged = (cars) => {
        this.view.displayCars(cars);
    };

    handleAddCar = ({id,brand,model,color,garaje,price,gasoline}) => {
         this.service.addCar({id,brand,model,color,garaje,price,gasoline});
         let valid=true;
       
        this.view.showResponse(valid);
     };
    handlerDeleteCar = (idCar) => {
        let car = this.service.findCarById(idCar);
        this.service.deleteCar(car);
    }
    handlerClickTrUpdate = (idCar) => {
        let car = this.service.findCarById(idCar);
        this.view.completeForm(car);
    }
    handlerUpdateCar = ({id,brand,model,color,garaje,price,gasoline}) => {
        this.service.updateCar({id,brand,model,color,garaje,price,gasoline});
       let valid=true;
        this.view.showResponse(valid);
    }



}
