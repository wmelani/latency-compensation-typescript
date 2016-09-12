export enum ParcelStatus {
    Pending = <any>"Pending",
    PendingDelivery = <any>"PendingDelivery",
    Delivered = <any>"Delivered",
    Undeliverable = <any>"Undeliverable"
}

export class Parcel {
    private _context:any;
    private _value:any;
    private _parcelStatus:ParcelStatus;

	public get context(): any {
		return this._context;
	}

	public get parcelStatus(): ParcelStatus {
		return this._parcelStatus;
	}

	public set parcelStatus(value: ParcelStatus) {
		this._parcelStatus = value;
	}
	public set context(value: any) {
		this._context = value;
	}
    public get value(): any {
		return this._value;
	}

	public set value(value: any) {
		this._value = value;
	}
    constructor(value:any,context:any){
        this._value=value;
        this._context=context;
        this._parcelStatus = ParcelStatus.Pending;
    }
	
}



