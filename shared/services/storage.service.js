class StorageService {
    LOCAL = 'localStorage';
    DIXIE = 'dexie';
    DEXIE_NAME = 'carRentalCompany';
   constructor({ type, configuration }) {
      if (type === 'dexie') {
        this.db;
      }
      this.type = type;
      this.configuration = configuration;
    }
  
    /*-----------------------ADD--------------------------------*/
  
    add = (item, storeName) => {
      this.type === this.DIXIE
        ? this._addDixie(item, storeName)
        : this._addLocal(item, storeName);
    };
  
    _addDixie = (item, storeName) => {
      console.log("Add",storeName);  
      this.db[storeName].add(item);
    };
  
    _addLocal = (item, storeName) => {
      let items = this._loadStore(storeName);
      console.log(item,storeName,"storageService");
      items = [...items, item];
      localStorage.setItem(storeName, JSON.stringify(items));
    };
    /*-----------------------REMOVE--------------------------------*/
  
    remove = (item, storeName) => {
      this.type === this.DIXIE
        ? this._removeDixie(item, storeName)
        : this._removeLocal(item, storeName);
    };
    _removeDixie = (item, storeName) => {
      this.db[storeName]
        .where(this.configuration.key)
        .anyOf(item[this.configuration.key])
        .delete();
    };
  
    _removeLocal = (item, storeName) => {
      const id = this.configuration.key;
      const items = this._loadStore(storeName).filter(
        (_item) => _item[id] !== item[id]
      );
      localStorage.setItem(storeName, JSON.stringify(items));
    };
  
    /*-------------------------UPDATE---------------------------------------------------*/
    update = (item, storeName) => {
      this.type === this.DIXIE
        ? this._updateDixie(item, storeName)
        : this._updateLocal(item, storeName);
    };
    _updateDixie = (item, storeName) => {
      this.db[storeName].update(item[this.configuration.key], item);
    };
  
    _updateLocal = (item, storeName) => {
      const id = this.configuration.key;
      const items = this._loadStore(storeName).map((_item) =>
        item[id] === _item[id] ? item : _item
      );
      localStorage.setItem(storeName, JSON.stringify(items));
    };
  
    /*---------------------------FINDONE------------------------------------------------------------------ */
  
    findOne = (item, storeName) => {
      return this.type === this.DIXIE
        ? this._findOneDixie(item, storeName)
        : this._findOneLocal(item, storeName);
    };
    _findOneDixie(item, storeName) {
      this.db[storeName].filter(
        (_item) => _item[this.configuration.key] == item[this.configuration.key]
      );
    }
    _findOneLocal(item, storeName) {
      const idToFind = item[this.configuration.key];
      const items = this._loadStore(storeName);
      return items.find((item) => item[this.configuration.key] === idToFind);
    }
    /*---------------------------FIND-----------------------------------------------------------*/
  
    find = (storeName) => {
      return this.type === this.DIXIE
        ? this._findDixie(storeName)
        : this._findLocal(storeName);
    };
  
    _findDixie(storeName) {
      return this.db[storeName].toArray();
    }
  
    _findLocal(storeName) {
      return Promise.resolve(this._loadStore(storeName));
    }
  
    _loadStore(storeName) {
      return JSON.parse(localStorage.getItem(storeName)) || [];
    }
  
    /** -----  Inicializar -----------  */
  
    initializeDB = () => {
      return this.type === this.DIXIE
        ? this._initializeDixie()
        : this._initializeLocalStorage();
    };
  
    _initializeLocalStorage() {
         return Promise.resolve(true);
    }
  
    _initializeDixie = () => {
      if (!this.db) {
         
        this.db = new Dexie(this.DEXIE_NAME);
        this.db.version(1).stores({
          cars: 'id',
          customers: 'id',
          bookings: 'id',
          garages: 'id'
        });
        console.log("entro por Dixie",this.db);
       Promise.resolve(true);
      }
    };
  }
  