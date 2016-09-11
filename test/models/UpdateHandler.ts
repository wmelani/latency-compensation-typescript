import { Parcel } from '../../src/Parcel/Parcel'
import { ParcelHandler } from '../../src/Parcel/ParcelHandler'



export class UpdateHandler implements ParcelHandler{

    wasHandleCalled = false;
    wasPromiseExecuted = false;
    theParcel:Parcel;
    handle(parcel:Parcel):Promise<any> {
        this.wasHandleCalled = true;
        return new Promise((resolve,reject)=> {
            this.wasPromiseExecuted = true;
            this.theParcel = parcel;
            resolve("Done");
        });
    }
}
