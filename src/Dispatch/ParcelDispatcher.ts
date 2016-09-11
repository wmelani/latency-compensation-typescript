import { Parcel } from '../Parcel/Parcel';
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

        var promise = parcelHandler.handle(parcel);
        this.parcels.set(parcelType,promise);
        return promise;
    }
    public registerParcelHandler(parcelType:any,parcelHandler:ParcelHandler){
        if (parcelType == null){
            throw new Error("Parcel type my not be null");
        }
        this.parcelHandlers.set(parcelType,parcelHandler);
    }
}