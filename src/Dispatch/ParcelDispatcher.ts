import { Parcel } from '../Parcel/Parcel';
import { ParcelHandler } from '../Parcel/ParcelHandler';

export class ParcelDispatcher {

    parcels:WeakMap<Parcel,Promise<any>>;
    parcelHandlers:WeakMap<any,ParcelHandler>;
    constructor(){
        this.parcels = new WeakMap<Parcel,Promise<any>>();
        this.parcelHandlers = new WeakMap<any,ParcelHandler>();
    }
    publishAsync(parcelType:any,parcel:Parcel){
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

        this.parcels.set(parcelType,parcelHandler.handle(parcel));
    }
    registerParcelHandler(parcelType:any,parcelHandler:ParcelHandler){
        if (parcelType == null){
            throw new Error("Parcel type my not be null");
        }
        this.parcelHandlers.set(parcelType,parcelHandler);
    }
}