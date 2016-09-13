import { Parcel, ParcelStatus } from '../Parcel/Parcel';
import { ParcelHandler } from '../Parcel/ParcelHandler';
import { ParcelTracker } from './ParcelTracker';

export class ParcelDispatcher {

    private parcels:WeakMap<Parcel,Promise<any>>;
    private parcelHandlers:WeakMap<any,ParcelHandler>;
    private parcelTrackers:Set<ParcelTracker>;

    constructor(){
        this.parcels = new WeakMap<Parcel,Promise<any>>();
        this.parcelHandlers = new WeakMap<any,ParcelHandler>();
        this.parcelTrackers = new Set<ParcelTracker>();
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
        
        var promise = new Promise((resolve,reject) => {
            try {
                parcel.parcelStatus = ParcelStatus.PendingDelivery;
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
                parcel.parcelStatus = ParcelStatus.Undeliverable;
                reject(exception);
                console.error(`Rejected parcel: ${JSON.stringify(parcelType)} value: ${JSON.stringify(parcel.value)} context: ${JSON.stringify(parcel.context)} -- parcelHandler: ${parcelHandler.constructor.name}`);
                console.info(`Exception calling handle on ${parcelHandler.constructor.name}, check the stack trace for more information`);
                console.error(exception);
            }
         });

         this.notifyParcelTrackers(parcelType,parcel,promise);
         return promise;
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
    public registerParcelTracker(parcelTracker:ParcelTracker){
        if (parcelTracker == null){
            throw new Error("Parcel tracker my not be null");
        }
        this.parcelTrackers.add(parcelTracker);
    }
    private notifyParcelTrackers(parcelType:any,parcel:Parcel,promise:Promise<any>){
        this.parcelTrackers.forEach(mem => mem.trackParcel(parcelType,parcel,promise));
    }
}