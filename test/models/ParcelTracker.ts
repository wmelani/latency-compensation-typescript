import { ParcelTracker, TrackedParcel } from '../../src/Dispatch/ParcelTracker';
import { Parcel } from '../../src/Parcel/Parcel';

export class DefaultParcelTracker implements ParcelTracker {
    wasTrackParcelCalled = false;
    parcelType:any;
    parcel:Parcel;
    promise:Promise<any>;
    trackParcel(parcelType:any,parcel:Parcel,promise:Promise<any>){
        this.wasTrackParcelCalled = true;
        this.parcelType = parcelType;
        this.parcel = parcel;
        this.promise = promise;
    }
    trackedParcels:TrackedParcel[];
    failedParcels:TrackedParcel[];
}