import {ParcelDispatcher} from './ParcelDispatcher';
import {Parcel, ParcelStatus} from '../Parcel/Parcel';

export interface ParcelTracker {
    trackParcel(parcelType:any,parcel:Parcel,promise:Promise<any>);
    trackedParcels:TrackedParcel[];
    failedParcels:TrackedParcel[];
}
export class TrackedParcel {
    parcel:Parcel;
    parcelType:any;
    constructor(parcelType:any,parcel:Parcel){
        this.parcel = parcel;
        this.parcelType = parcelType;
    }
}
//todo: should this class exist? the bi-directional dependency is :(
export class RetryableParcelTracker implements ParcelTracker {
    
    private _parcelDispatcher:ParcelDispatcher;
    private _trackedParcels:Set<TrackedParcel>;
    constructor(parcelDispatcher:ParcelDispatcher){
        if (parcelDispatcher == null){
            throw new Error("Parcel dispatcher must not be null");
        }
        this._parcelDispatcher = parcelDispatcher;
        this._trackedParcels = new Set<TrackedParcel>();
    }
    public get trackedParcels(): TrackedParcel[]{
        return Array.from(this._trackedParcels);
    }
    public get failedParcels(): TrackedParcel[]{
        return Array.from(this._trackedParcels)
                .filter(mem => mem.parcel.parcelStatus == ParcelStatus.Undeliverable);
    }
    public trackParcel(parcelType:any,parcel:Parcel,promise:Promise<any>){
        var trackedParcel = new TrackedParcel(parcelType,parcel);
        this._trackedParcels.add(trackedParcel);
        promise.then(fulfilled => {
            this.stopTracking(trackedParcel)
        },
        rejected => {

        });

    }
    
    public retry(trackedParcel:TrackedParcel){
        this._trackedParcels.delete(trackedParcel);
        //todo: this is kind of ugly here
        trackedParcel.parcel.parcelStatus = ParcelStatus.Pending;
        this._parcelDispatcher.publishAsync(trackedParcel.parcelType,trackedParcel.parcel);
    }
    private stopTracking(trackedParcel:TrackedParcel){
        if (!this._trackedParcels.has(trackedParcel)) { 
            return;
        }
        this._trackedParcels.delete(trackedParcel);
    }
}