import { ParcelDispatcher } from '../src/Dispatch/ParcelDispatcher';
import { Parcel } from '../src/Parcel/Parcel';

import { UpdateHandler } from './models/UpdateHandler';
import { ActionType } from './models/ActionType';

import * as tsUnit from './tsUnit/tsUnitAsync';


export class ParcelDispatcherAsyncTests extends tsUnit.TestClass {
    canDispatchAParcel(){
        var parcelDispatcher = new ParcelDispatcher();
        var updateHandler = new UpdateHandler();
        var parcel = new Parcel("contents","context");
        parcelDispatcher.registerParcelHandler(ActionType.UpdateName,updateHandler);
        parcelDispatcher.publishAsync(ActionType.UpdateName,parcel);
        
        this.isTrue(updateHandler.wasHandleCalled,"expected handle to be called on the update handler");
        this.isTrue(updateHandler.wasPromiseExecuted, "expected the promise to have been executed");
        this.areIdentical(parcel,updateHandler.theParcel, "expected the parcel sent to the handler to be the correct one")
    }

}