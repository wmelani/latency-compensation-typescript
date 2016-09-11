import { Parcel } from '../../src/Parcel/Parcel'
import { ParcelHandler } from '../../src/Parcel/ParcelHandler'



export class UpdateHandler implements ParcelHandler{

    handle(parcel:Parcel):Promise<any> {
        console.log("Handled");
        return new Promise((resolve,reject)=> {
            console.log("done");
            resolve("Done");
        });
    }
}
