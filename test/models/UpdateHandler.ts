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

export class WaitingUpdateHandler implements ParcelHandler{
    handle(parcel:Parcel):Promise<any> {
        return new Promise((resolve,reject)=> {
            setTimeout(() => resolve("Done"),<number>parcel.value);
        });
    }
}
export class ErrorInHandleUpdateHandler implements ParcelHandler{
    handle(parcel:Parcel):Promise<any> {
        throw new Error("error directly in handle");
    }
}
export class ErrorRejectUpdateHandler implements ParcelHandler{
    handle(parcel:Parcel):Promise<any> {
        return new Promise((resolve,reject)=> {
            reject(ErrorRejectBody);
        });
    }
}
export const ErrorRejectBody = {"rejection" : "it hurts"};


