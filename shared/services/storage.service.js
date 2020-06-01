class StorageService {
    LOCAL='localStorage';
    DIXIE= 'dexie';
    INDEXED='indexedDB';
    DEXIE_NAME = 'carRentalCompany';
    INDEX_NAME = 'carRentalIndex';
    /* 
    configuration LocalStorage
       id
   */

    /**
     *
     * @param {String} type Tipo de Storage: indexedDB localStorage Dexie
     * @param {Object} configuration Objeto de configuracion: { id: string }
     */


    constructor({ type, configuration}) {
        if (type === 'indexedDB' || type=='dexie') {
            this.db;
        }
        this.type = type;
        this.configuration = configuration;
       
    }


    /*-----------------------ADD--------------------------------*/

    add = (item, storeName) => {
   
      switch (this.type){
        case this.INDEXED : 
                          this._addIndexed(item,storeName);
                          break;
        case this.DIXIE:
                          this. _addDixie(item,storeName);
                          break;
        case this.LOCAL:
                          this._addLocal(item,storeName);
                          break;
        } 
    }
    
    _addDixie = (item, storeName) => {
       this.db[storeName].add(item);
    };
  
    _addLocal = (item, storeName) => {
      let items = this._loadStore(storeName);
      items = [...items, item];
      localStorage.setItem(storeName, JSON.stringify(items));
    };
    
    _addIndexed = (item,storeName) => {
        /*this._findOneIndexed(item)
            .then((element) => {
               console.log('El elemento ya existe');
            })
            .catch(() => {
               let transaction = this.db.transaction([this.INDEX_NAME], 'readwrite');
               let objectStore = transaction.objectStore(storeName);
               let request = objectStore.add(item);
               request.onsuccess = () => console.log('Elemento añadido');
           

            });*/
    };
    /*-----------------------REMOVE--------------------------------*/


    remove = (content, storeName) => {
      switch (this.type){
        case this.INDEXED : 
                         this._removeIndexed(content, storeName)
                          break;
        case this.DIXIE:
                          this._removeDixie(content, storeName);
                          break;
        case this.LOCAL:
                          this._removeLocal(content, storeName);
                          break;
        } 
     }  
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
  
    _removeIndexed = (item,storeName) => {
      /* const transaction = this.db.transaction([this.INDEX_NAME], 'readwrite');
        const objectStore = transaction.objectStore(storeName);
        const request = objectStore.delete(item[this.configuration.key]);
        request.onsuccess = () => console.log('Elemento borrado');*/
    };


    /*-------------------------UPDATE---------------------------------------------------*/
    update = (item, storeName) => {
      switch (this.type){
        case this.INDEXED :
                          this._updateIndexed(item,storeName)
                          break;
        case this.DIXIE:
                          this._updateDixie(item,storeName) 
                          break;
        case this.LOCAL:
                          this._updateLocal(item,storeName);
                          break;
      } 
                
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
   _updateIndexed = (item,storeName) => {
       /* const transaction = this.db.transaction([this.INDEX_NAME], 'readwrite');
        const objectStore = transaction.objectStore(storeName);
        const request = objectStore.put(item);*/
    };

    /*---------------------------FINDONE------------------------------------------------------------------ */

    findOne = (item, storeName) => {

      let content;
      switch (this.type){
      
        case this.INDEXED :
          content=this._findOneIndexed(item, storeName)
                           break;
        case this.DIXIE:
          content=this._findOneDixie(item, storeName)
                          break;
        case this.LOCAL:
          content= this._findOneLocal(item, storeName);
                          break;
      } 
      return content;
    }
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
    _findOneIndexed = (item,storeName) => {
      /*  const transaction = this.db.transaction([this.INDEX_NAME], 'readwrite');
        const objectStore = transaction.objectStore(storeName);
        return new Promise((resolve, reject) => {
            const request = objectStore.get(storeName[this.configuration.key]);
            request.onsuccess = (event) => {
                const result = event.target.result;
                result ? resolve(result) : reject();
            };
        });*/
    };
    /*---------------------------FIND-----------------------------------------------------------*/

    find = (storeName) => {
            let items;
            switch (this.type){
              case this.INDEXED :
                             items=this._findIndexed(storeName)
                                break;
              case this.DIXIE:
                              items=  this._findDixie(storeName)
                                break;
              case this.LOCAL:
                             items=  this._findLocal(storeName) 
                                break;
            } 
            return items;
         
     }
    _findDixie(storeName) {
      return this.db[storeName].toArray();
    }
  
    _findLocal(storeName) {
      return Promise.resolve(this._loadStore(storeName));
    }
  
    _loadStore(storeName) {
      return JSON.parse(localStorage.getItem(storeName)) || [];
    }

    _findIndexed = (storeName) => {
       /* const transaction = this.db.transaction([this.INDEX_NAME], 'readwrite');
        const objectStore = transaction.objectStore(this.storeName);
        const request = objectStore.openCursor();
        return new Promise((resolve, reject) => {
          const obs = [];
          request.onsuccess = (e) => {
            const cursor = e.target.result;
            if (cursor) {
              obs.push(cursor.value);
              cursor.continue();
            } else {
              resolve(obs);
            }
          };
        });*/
      };
    /** -----  Inicializar -----------  */

    initializeDB = () => {
      let store;
      switch (this.type){
        case this.INDEXED :
                          store= this._initializeIndexedDB()
                          break;
        case this.DIXIE:
                          store= this._initializeDixie()
                          break;
        case this.LOCAL:
                          store= this._initializeLocalStorage();
                          break;
      } 
      return store;
       
      }
    
     _initializeIndexedDB() {
       /* return this._openIndexedDB().then(() => {
          let transaction = this.db.transaction(this.INDEX_NAME, 'readwrite');
          let objectStore = transaction.objectStore(this.configuration.db);
    
          objectStore.onsuccess = function () {
            console.log('objectStore.result', objectStore.result);
          };
    
          objectStore.onerror = function () {
            console.log('Error', objectStore.error);
          };
        });*/
      }
    
    
    
       _openIndexedDB = () => {
      /*  return new Promise((resolve, reject) => {
          const indexedDB = window.indexedDB;
          if (!indexedDB) {
            reject('IndexedDB not defined');
          }
          if (this.db) {
            resolve({ db: this.db });
          }
    
          //base datos
          const request = indexedDB.open(this.configuration.db, 2);
    
          request.onsuccess = () => {
            this.db = request.result;
            resolve({ db: request.result });
          };
    
          request.onupgradeneeded = () =>
            request.result.createObjectStore(this.configuration.db, { keyPath: 'id' });
           
        });*/
      };

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
      
       Promise.resolve(true);
      }
    };
  }