import { Parcel } from './Parcel';

export interface ParcelHandler{
    handle(parcel:Parcel):Promise<any>;
}