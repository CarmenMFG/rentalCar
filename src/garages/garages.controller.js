class GarageController {

    constructor(service, view,validation) {
        this.service = service;
        this.view = view;
        this.serviceValidation=validation;
        this.view.bindAddGarage(this.handleAddGarage);
        this.view.bindDeleteGarage(this.handlerDeleteGarage);
        this.view.bindClickTrUpdate(this.handlerClickTrUpdate);
        this.view.bindUpdateGarage(this.handlerUpdateGarage);
        this.service.bindGarageListChanged(this.onGarageListChanged);
        this.view.bindResetForm();
        this.view.bindClickAddForm();
        // Display initial users
        this.onGarageListChanged(this.service.garages);
    }
    onGarageListChanged = (garages) => {
        this.view.displayGarages(garages);
    };

    handleAddGarage = ({id,address}) => {
        let valid=false;
        if (this.serviceValidation.validateFieldText({id,address})){
         this.service.addGarage({id,address});
         valid=true;
        }
        this.view.showResponse(valid);
     };
    handlerDeleteGarage = (idGarage) => {
        let garage = this.service.findGarageById(idGarage);
        this.service.deleteGarage(garage);
    }
    handlerClickTrUpdate = (idGarage) => {
        let garage = this.service.findGarageById(idGarage);
        this.view.completeForm(garage);
    }
    handlerUpdateGarage = ({id,address}) => {
        let valid=false;
        if (this.serviceValidation.validateFieldText({id,address})){ 
            this.service.updateGarage({id,address});
            valid=true;
         }
         this.view.showResponse(valid);
    }



}
