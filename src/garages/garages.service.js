class GarageService {
    CONST_GARAGES_TABLE='garages';
    constructor(local,dixie,validation,httpService) {
        this.local=local;
        this.dixie=dixie;
        this.validation=validation;
        this.httpService=httpService;
        this.garages=[];
        this.URL='http://localhost:8001/garages';
        
    } 
    async loadGaragesAwait() {
       const garages = await this.local.find(this.CONST_GARAGES_TABLE);
       // this.garages=garages;
       this.garages = (garages || []).map(garage => new Garage(garage));
       return this.garages;
    }

    _validateData({id,address}){
        const errors={};
       if (!this.validation.validateFieldText(id)){
           errors.ERROR_NAMEINVALID=true;
       }
       if (!this.validation.validateFieldText(address)){
           errors.ERROR_ADDRESSINVALID=true;
       }
       if (Object.keys(errors).length>0){
           throw new GaragesException(errors);
       } 
      return true;
    }


    bindGarageListChanged(callback) {
        this.onGarageListChanged = callback;
    }
    _commit(garages) {
        this.onGarageListChanged(garages);
    }
    addGarage(garage) {
        this._validateData(garage);
        let garageObj = new Garage(garage)
        this.garages = [...this.garages, garageObj];
        this.local.add(garageObj,this.CONST_GARAGES_TABLE);
        this.dixie.add(garageObj,this.CONST_GARAGES_TABLE);
        this.httpService.post(this.URL,JSON.stringify(garageObj));
        this._commit(this.garages);

    }
    findGarageById(idGarage) {
        return this.garages.find(({ id }) => id == idGarage);
    }
    deleteGarage(garage) {
        this.garages = this.garages.filter(({ id }) => id != garage.id);
        this.local.remove(garage,this.CONST_GARAGES_TABLE);
        this.dixie.remove(garage,this.CONST_GARAGES_TABLE);
        this.httpService.delete(this.URL,JSON.stringify(garage));
        this._commit(this.garages);
    }
    updateGarage(garage) {
        this._validateData(garage);
        let garageObj = new Garage(garage);
        this.garages = this.garages.map((_garage) =>
        _garage.id === garage.id ? garageObj : _garage);
        this.local.update(garage,this.CONST_GARAGES_TABLE);
        this.dixie.update(garage,this.CONST_GARAGES_TABLE);
        this.httpService.put(this.URL,JSON.stringify(garage));
        this._commit(this.garages);
    }


} 
