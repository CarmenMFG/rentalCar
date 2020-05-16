class StorageService {
    LOCAL='localStorage';
    DIXIE= 'dixie';
    INDEXED='indexedDB';
    /* 
    configuration LocalStorage
       id
   */

    /**
     *
     * @param {String} type Tipo de Storage: indexedDB localStorage
     * @param {Object} configuration Objeto de configuracion: { id: string }
     */


    constructor({ type, configuration ,key }) {
        if (type === 'indexedDB' || type=='Dixie') {
            this.db;
        }
        this.KEY=key;
        this.type = type;
        this.configuration = configuration;
        
    }


    /*-----------------------ADD--------------------------------*/

    add = (item) => {
   
      switch (this.type){
        case this.INDEXED : 
                          this._addIndexed(item);
                          break;
        case this.DIXIE:
                          this. _addDixie(item);
                          break;
        case this.LOCAL:
                          this._addLocal(item);
                          break;
        } 
    }
    
    /// Cuidado hay q quitar los wines //////
    _addDixie=(item)=>{
      this.db.wines.add(item);  
     }
        

    _addLocal = (item) => {
            let items=this._loadStore();
            items = [...items, item];
            localStorage.setItem(this.KEY, JSON.stringify(items));
        
    };

    _addIndexed = (wine) => {
        this._findOneIndexed(wine)
            .then((ejemplo) => {
                console.log(ejemplo);
                console.log('Vino ya existente');
            })
            .catch(() => {
               let transaction = this.db.transaction(['wines'], 'readwrite');
               let objectStore = transaction.objectStore('wines');
               let request = objectStore.add(wine);
               request.onsuccess = () => console.log('Vino añadido');
           

            });
    };
    /*-----------------------REMOVE--------------------------------*/


    remove = (content) => {
      switch (this.type){
        case this.INDEXED : 
                         this._removeIndexed(content)
                          break;
        case this.DIXIE:
                          this._removeDixie(content);
                          break;
        case this.LOCAL:
                          this._removeLocal(content);
                          break;
        } 
     }  
     _removeDixie=(item)=>{
        this.db.wines.where("id").anyOf(item.id).delete();
     }  
      
    
    _removeLocal = (item) => {
        const id = this.configuration.key;
        const items = this._loadStore().filter((_item) => _item[id] !== item[id]);
        localStorage.setItem(this.KEY, JSON.stringify(items));
    };
    _removeIndexed = (wine) => {
        const transaction = this.db.transaction(['wines'], 'readwrite');
        const objectStore = transaction.objectStore('wines');
        const request = objectStore.delete(wine.id);
        request.onsuccess = () => console.log('Vino borrado');
    };


    /*-------------------------UPDATE---------------------------------------------------*/
    update = (item) => {
      switch (this.type){
        case this.INDEXED :
                          this._updateIndexed(item)
                          break;
        case this.DIXIE:
                          this._updateDixie(item) 
                          break;
        case this.LOCAL:
                          this._updateLocal(item);
                          break;
      } 
                
    };
    _updateDixie=(item)=>{
      this.db.wines.update(item.id,item); 
    }

    _updateLocal = (item) => {
        const id = this.configuration.key;
        const items = this._loadStore().map((_item) =>
            item[id] === _item[id] ? item : _item,
        );
        localStorage.setItem(this.KEY, JSON.stringify(items));
    };
    _updateIndexed = (wine) => {
        const transaction = this.db.transaction(['wines'], 'readwrite');
        const objectStore = transaction.objectStore('wines');
        const request = objectStore.put(wine);
    };

    /*---------------------------FINDONE------------------------------------------------------------------ */

    findOne = (item) => {

      let content;
      switch (this.type){
      
        case this.INDEXED :
                           content=this._findOneIndexed(item)
                           break;
        case this.DIXIE:
          content=this._findOneDixie(item)
                          break;
        case this.LOCAL:
          content= this._findOneLocal(item);
                          break;
      } 
      return content;
    }
    _findOneDixie(item) {  
      this.db.wines.filter((wine)=>wine.id==item.id);
    };
   _findOneLocal(item) {
        const idToFind = item[this.configuration.key];
        const items = this._loadStore();
        return items.find((item) => item[this.configuration.key] === idToFind);
    }
    _findOneIndexed = (wine) => {
        const transaction = this.db.transaction(['wines'], 'readwrite');
        const objectStore = transaction.objectStore('wines');
        return new Promise((resolve, reject) => {
            const request = objectStore.get(wine.id);
            request.onsuccess = (event) => {
                const result = event.target.result;
                result ? resolve(result) : reject();
            };
        });
    };
    /*---------------------------FIND-----------------------------------------------------------*/

    find = () => {
            let items;
            switch (this.type){
              case this.INDEXED :
                             items=this._findIndexed()
                                break;
              case this.DIXIE:
                              items=  this._findDixie()
                                break;
              case this.LOCAL:
                             items=  this._findLocal() 
                                break;
            } 
            return items;
         
     }
     _findDixie() {
              
      return  this.db.wines.toArray();
      }

    _findLocal() {
       
        return Promise.resolve(this._loadStore());
    }
    _loadStore() {
        return (JSON.parse(localStorage.getItem(this.KEY)) || []);

    }

    _findIndexed = () => {
        const transaction = this.db.transaction(['wines'], 'readwrite');
        const objectStore = transaction.objectStore('wines');
        const request = objectStore.openCursor();
        return new Promise((resolve, reject) => {
          const wines = [];
    
          request.onsuccess = (e) => {
            const cursor = e.target.result;
            if (cursor) {
              wines.push(cursor.value);
              cursor.continue();
            } else {
              resolve(wines);
            }
          };
        });
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
        return this._openIndexedDB().then(() => {
          let transaction = this.db.transaction('wines', 'readwrite');
          let objectStore = transaction.objectStore('wines');
    
          objectStore.onsuccess = function () {
            console.log('objectStore.result', objectStore.result);
          };
    
          objectStore.onerror = function () {
            console.log('Error', objectStore.error);
          };
        });
      }
    
      _initializeLocalStorage() {
        localStorage.setItem(this.KEY, JSON.stringify(this.initialWines));
        return Promise.resolve(true);
      }
    
      _openIndexedDB = () => {
        return new Promise((resolve, reject) => {
          const indexedDB = window.indexedDB;
          if (!indexedDB) {
            reject('IndexedDB not defined');
          }
          if (this.db) {
            resolve({ db: this.db });
          }
    
          //base datos
          const request = indexedDB.open('wineCellar', 2);
    
          request.onsuccess = () => {
            this.db = request.result;
            resolve({ db: request.result });
          };
    
          request.onupgradeneeded = () =>
            request.result.createObjectStore('wines', { keyPath: 'id' });
           
        });
      };

      _initializeDixie =()=>{
        if (!this.db){
          this.db = new Dexie('wine-database');
          this.db.version(1).stores({
              wines: 'id'
         });
           Promise.resolve(true);
   
      }

   }

    


}