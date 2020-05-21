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


    constructor({ type, configuration}) {
        if (type === 'indexedDB' || type=='Dixie') {
            this.db;
        }
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
    
    _addDixie=(item)=>{
      this.db.element.add(item);  
     }
        

    _addLocal = (item) => {
            let items=this._loadStore();
            items = [...items, item];
            localStorage.setItem(this.configuration.db, JSON.stringify(items));
        
    };

    _addIndexed = (item) => {
        this._findOneIndexed(item)
            .then((element) => {
               console.log('El elemento ya existe');
            })
            .catch(() => {
               let transaction = this.db.transaction([this.configuration.db], 'readwrite');
               let objectStore = transaction.objectStore(this.configuration.db);
               let request = objectStore.add(item);
               request.onsuccess = () => console.log('Elemento añadido');
           

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
        this.db.element.where("id").anyOf(item.id).delete();
     }  
      
    
    _removeLocal = (item) => {
        const id = this.configuration.key;
        const items = this._loadStore().filter((_item) => _item[id] !== item[id]);
        localStorage.setItem(this.configuration.db, JSON.stringify(items));
    };
    _removeIndexed = (item) => {
        const transaction = this.db.transaction([this.configuration.db], 'readwrite');
        const objectStore = transaction.objectStore(this.configuration.db);
        const request = objectStore.delete(item[this.configuration.key]);
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
      this.db.element.update(item.id,item); 
    }

    _updateLocal = (item) => {
        const id = this.configuration.key;
        const items = this._loadStore().map((_item) =>
            item[id] === _item[id] ? item : _item,
        );
        localStorage.setItem(this.configuration.db, JSON.stringify(items));
    };
   _updateIndexed = (item) => {
        const transaction = this.db.transaction([this.configuration.db], 'readwrite');
        const objectStore = transaction.objectStore(this.configuration.db);
        const request = objectStore.put(item);
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
      this.db.element.filter((_item)=>_item[this.configuration.key]==item[this.configuration.key]);
    };
   _findOneLocal(item) {
        const idToFind = item[this.configuration.key];
        const items = this._loadStore();
        return items.find((item) => item[this.configuration.key] === idToFind);
    }
    _findOneIndexed = (item) => {
        const transaction = this.db.transaction([this.configuration.db], 'readwrite');
        const objectStore = transaction.objectStore(this.configuration.db);
        return new Promise((resolve, reject) => {
            const request = objectStore.get(item[this.configuration.key]);
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
      console.log( this.db.container1);
      return  this.db.element.toArray();
      }

    _findLocal() {
       
        return Promise.resolve(this._loadStore());
    }
    _loadStore() {
      console.log("dentro del storage",this.configuration.db);
      console.log(JSON.parse(localStorage.getItem(this.configuration.db)) || []);
        return (JSON.parse(localStorage.getItem(this.configuration.db)) || []);

    }

    _findIndexed = () => {
        const transaction = this.db.transaction([this.configuration.db], 'readwrite');
        const objectStore = transaction.objectStore(this.configuration.db);
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
          let transaction = this.db.transaction(this.configuration.db, 'readwrite');
          let objectStore = transaction.objectStore(this.configuration.db);
    
          objectStore.onsuccess = function () {
            console.log('objectStore.result', objectStore.result);
          };
    
          objectStore.onerror = function () {
            console.log('Error', objectStore.error);
          };
        });
      }
    
      _initializeLocalStorage() {
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
          const request = indexedDB.open(this.configuration.db, 2);
    
          request.onsuccess = () => {
            this.db = request.result;
            resolve({ db: request.result });
          };
    
          request.onupgradeneeded = () =>
            request.result.createObjectStore(this.configuration.db, { keyPath: 'id' });
           
        });
      };

      _initializeDixie =()=>{
        if (!this.db){
          this.db = new Dexie(this.configuration.db);
          this.db.version(1).stores({
            element: 'id'
         });
          Promise.resolve(true);
   
      }

   }

    


}