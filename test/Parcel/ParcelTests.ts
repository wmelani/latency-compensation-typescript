import { Parcel,ParcelStatus } from '../../src/Parcel/Parcel';
import * as tsUnit from '../tsUnit/tsUnit';

export class ParcelTests extends tsUnit.TestClass {
    canCreateParcel(){
        let parcel = new Parcel("value","context");
        this.areIdentical("value",parcel.value);
        this.areIdentical("context","context");
        this.areIdentical(ParcelStatus.Pending,parcel.parcelStatus);
    }
}