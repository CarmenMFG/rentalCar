class GarageService {
    CONST_GARAGES_TABLE='garages';
    constructor(local,dixie) {
        this.local=local;
        this.dixie=dixie;
        this.garages=[];
        
    } 
    async loadGaragesAwait() {
       const garages = await this.local.find(this.CONST_GARAGES_TABLE);
       console.log("garages",garages);
      // this.garages=garages;
       this.garages = (garages || []).map(garage => new Garage(garage));
       return this.garages;
    }
    bindGarageListChanged(callback) {
        this.onGarageListChanged = callback;
    }
    _commit(garages) {
        this.onGarageListChanged(garages);
    }
    addGarage(garage) {
       console.log("dixie",this.dixie);
        let garageObj = new Garage(garage)
        this.garages = [...this.garages, garageObj];
        this.local.add(garageObj,this.CONST_GARAGES_TABLE);
        this.dixie.add(garageObj,this.CONST_GARAGES_TABLE);
        this._commit(this.garages);

    }
    findGarageById(idGarage) {
        return this.garages.find(({ id }) => id == idGarage);
    }
    deleteGarage(garage) {
        this.garages = this.garages.filter(({ id }) => id != garage.id);
        this.local.remove(garage,this.CONST_GARAGES_TABLE);
        this.dixie.remove(garage,this.CONST_GARAGES_TABLE);
        this._commit(this.garages);
    }
    updateGarage(garage) {
        console.log(new Garage(garage) );
        this.garages = this.garages.map((_garage) =>
        _garage.id === garage.id ? new Garage(garage) : _garage);
        this.local.update(garage,this.CONST_GARAGES_TABLE);
        this.dixie.update(garage,this.CONST_GARAGES_TABLE);
        this._commit(this.garages);
    }


} 
