class GarageService {
    constructor(local,dixie) {
        this.local=local;
        this.dixie=dixie;
        this.garages=[];
        
    } 
    async loadGaragesAwait() {
       const garages = await this.local.find();
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
        let garageObj = new Garage(garage)
        this.garages = [...this.garages, garageObj];
        this.local.add(garageObj);
        this.dixie.add(garageObj);
        this._commit(this.garages);

    }
    findGarageById(idGarage) {
        return this.garages.find(({ id }) => id == idGarage);
    }
    deleteGarage(garage) {
        this.garages = this.garages.filter(({ id }) => id != garage.id);
        this.local.remove(garage);
        this.dixie.remove(garage);
        this._commit(this.garages);
    }
    updateGarage(garage) {
        console.log(new Garage(garage) );
        this.garages = this.garages.map((_garage) =>
        _garage.id === garage.id ? new Garage(garage) : _garage);
        this.local.update(garage);
        this.dixie.update(garage);
        this._commit(this.garages);
    }


} 
