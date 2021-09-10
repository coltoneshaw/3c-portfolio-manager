const { contextBridge, ipcRenderer } = require('electron')
import {Type_UpdateFunction } from '@/types/3Commas'

async function setupContextBridge() {

  contextBridge.exposeInMainWorld('electron', {
    api: {
      async update( type: string, options: Type_UpdateFunction ) {
        console.log('Updating 3Commas data.')
        await ipcRenderer.invoke('api-updateData', type, options);
      },
      async updateBots() {
        console.log('Fetching Bot Data')
        return await ipcRenderer.invoke('api-getBots');
      },
      async getDealsBulk( limit:number ) {
        // console.log('updating the database.')
        return await ipcRenderer.invoke('api-getDealsBulk', limit);
      },
      async getAccountData(key?:string , secret?:string, mode?:string) {
        // console.log('updating the database.')
        return await ipcRenderer.invoke('api-getAccountData', key , secret, mode);
      },
    },
    config: {
      async get( value:string ) {
        console.log('fetching Config')
        return await ipcRenderer.invoke('allConfig', value);;
      },
      async reset() {
        /**
         * TODO
         * - Add error handling for default config here.
         */
        console.log('attempting to reset the config to default values.')
        await ipcRenderer.invoke('config-clear')
      },
      async set(key:string, value:any) {
        console.log('writing Config')
        return await ipcRenderer.invoke('setStoreValue', key, value);

      },
      async bulk(changes:object) {
        console.log('writing Config bulk')
        return await ipcRenderer.invoke('setStoreValue', null, changes);
      }
    },
    database: {
      async query(queryString:string) {
        console.log('running database query')
        return await ipcRenderer.invoke('query-database', queryString);
      },
      async update(table:string, updateData:object[]) {
        console.log('updating the database.')
        return await ipcRenderer.invoke('update-database', table, updateData);
      },
      async upsert(table:string, data:any[], id:string, updateColumn:string) {
        console.log('running upsert on the database.')
        return await ipcRenderer.invoke('upsert-database', table, data, id, updateColumn);
      },
      async run(query:string) {
        console.log('running query' + query)
        return await ipcRenderer.invoke('run-database', query);
      },
      async deleteAllData() {
        console.log('deleting all data!')
        return await ipcRenderer.invoke('database-deleteAll');
      }
    },
    general: {
      openLink(link: string){
        ipcRenderer.invoke('open-external-link', link);
      }
    },
    binance: {
      async coinData(){
        return await ipcRenderer.invoke('binance-getCoins');
      }
    },
    pm: {
      async versions(){
        return await ipcRenderer.invoke('pm-versions');
      }
    }
  })
}



async function databaseSetup() {
  await ipcRenderer.invoke('database-checkOrMakeTables');
}


databaseSetup();

setupContextBridge();