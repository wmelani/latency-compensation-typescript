import { Parcel, ParcelStatus } from '../Parcel/Parcel';
import { ParcelHandler } from '../Parcel/ParcelHandler';

export class ParcelDispatcher {

    private parcels:WeakMap<Parcel,Promise<any>>;
    private parcelHandlers:WeakMap<any,ParcelHandler>;
    constructor(){
        this.parcels = new WeakMap<Parcel,Promise<any>>();
        this.parcelHandlers = new WeakMap<any,ParcelHandler>();
    }
    public publishAsync(parcelType:any,parcel:Parcel){
        if (parcelType == null){
            throw new Error("parcelType may not be null");
        }
        if (parcel == null){
            throw new Error("parcel may not be null");
        }
        let parcelHandler = this.parcelHandlers.get(parcelType);
        if (parcelHandler == null){
            console.error("No parcel handler available for request",parcel);
            throw new Error("No parcel handler available for request");
        }
        
        return new Promise((resolve,reject) => {
            try {
                var promise = parcelHandler.handle(parcel);
                this.parcels.set(parcelType,promise);
                promise.then(
                    fulfilled => {
                        parcel.parcelStatus = ParcelStatus.Delivered;
                        resolve(fulfilled);
                        console.info(`Resolved parcel: ${JSON.stringify(parcelType)} value: ${JSON.stringify(parcel.value)} context: ${JSON.stringify(parcel.context)} -- parcelHandler: ${parcelHandler.constructor.name}`);
                        this.parcels.delete(parcel);
                    }, 
                    rejected => {
                        parcel.parcelStatus = ParcelStatus.Undeliverable
                        reject(rejected);
                        console.error(`Rejected parcel: ${JSON.stringify(parcelType)} value: ${JSON.stringify(parcel.value)} context: ${JSON.stringify(parcel.context)} -- parcelHandler: ${parcelHandler.constructor.name}`);
                        this.parcels.delete(parcel);
                    }
                );
                
            }
            catch(exception){
                parcel.parcelStatus = ParcelStatus.Undeliverable
                reject(exception);
                console.error(`Rejected parcel: ${JSON.stringify(parcelType)} value: ${JSON.stringify(parcel.value)} context: ${JSON.stringify(parcel.context)} -- parcelHandler: ${parcelHandler.constructor.name}`);
                console.info(`Exception calling handle on ${parcelHandler.constructor.name}, check the stack trace for more information`);
                console.error(exception);
            }
         });
    }
    public registerParcelHandler(parcelType:any,parcelHandler:ParcelHandler){
        if (parcelType == null){
            throw new Error("Parcel type my not be null");
        }
        this.parcelHandlers.set(parcelType,parcelHandler);
    }
    public hasParcel(parcel:Parcel):boolean {
        return this.parcels.has(parcel);
    }
}