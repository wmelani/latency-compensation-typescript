import { Parcel } from '../Parcel/Parcel'
import { ParcelHandler } from '../Parcel/ParcelHandler'



export class UpdateHandler implements ParcelHandler{

    handle(parcel:Parcel):Promise<any> {
        console.log("Handled");
        return new Promise((resolve,reject)=> {
            console.log("done");
            resolve("Done");
        });
    }
}
