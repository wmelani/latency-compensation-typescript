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
        let parcelHandler = this.parcelHandlers.get(parcelType);
        if (parcelHandler == null){
            console.error("No parcel handler available for request",parcel);
            throw "No parcel handler available for request";
        }

        this.parcels.set(parcelType,parcelHandler.handle(parcel));
    }
    registerParcelHandler(parcelType:any,parcelHandler:ParcelHandler){
        this.parcelHandlers.set(parcelType,parcelHandler);
    }
}