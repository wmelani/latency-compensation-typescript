import { ParcelDispatcher } from '../../src/Dispatch/ParcelDispatcher';
import { Parcel,ParcelStatus } from '../../src/Parcel/Parcel';

import { UpdateHandler, WaitingUpdateHandler, ErrorInHandleUpdateHandler, ErrorRejectUpdateHandler,ErrorRejectBody } from '../models/UpdateHandler';
import { ActionType } from '../models/ActionType';

import * as tsUnit from '../tsUnit/tsUnitAsync';

export class ParcelDispatcherAsyncTests extends tsUnit.TestClass {
    public canDispatchAParcel(){
        var parcelDispatcher = new ParcelDispatcher();
        var updateHandler = new UpdateHandler();
        var parcel = new Parcel("contents","context");
        parcelDispatcher.registerParcelHandler(ActionType.UpdateName,updateHandler);
        return parcelDispatcher.publishAsync(ActionType.UpdateName,parcel)
            .then( () => {
                this.isTrue(updateHandler.wasHandleCalled,"expected handle to be called on the update handler");
                this.isTrue(updateHandler.wasPromiseExecuted, "expected the promise to have been executed");
                this.areIdentical(parcel,updateHandler.theParcel, "expected the parcel sent to the handler to be the correct one")
                this.areIdentical(ParcelStatus.Delivered, parcel.parcelStatus, "expected delivered parcel status");
                this.isFalse(parcelDispatcher.hasParcel(parcel));
            })
            .catch((e) => {
                    console.log(e); 
                    this.fail("should not have failed the promise execution");
                    
            });
        
        
    }
    public isUndeliverableStatusIfErrorInHandle() {
        var parcelDispatcher = new ParcelDispatcher();
        var updateHandler = new ErrorInHandleUpdateHandler();
        var parcel = new Parcel("contents","context");
        parcelDispatcher.registerParcelHandler(ActionType.UpdateName,updateHandler);
        return parcelDispatcher.publishAsync(ActionType.UpdateName,parcel)
            .then( (e) => {
                console.log(e);
                this.fail("expected a failure to occur");
            })
            .catch((e) => {
                this.areIdentical(ParcelStatus.Undeliverable,parcel.parcelStatus,"expected parcel to be undeliverable status");
                this.isFalse(parcelDispatcher.hasParcel(parcel));
            });
        
    }
    public isUndeliverableStatusIfRejectedPromise() {
        var parcelDispatcher = new ParcelDispatcher();
        var updateHandler = new ErrorRejectUpdateHandler();
        var parcel = new Parcel("contents","context");
        parcelDispatcher.registerParcelHandler(ActionType.UpdateName,updateHandler);
        return parcelDispatcher.publishAsync(ActionType.UpdateName,parcel)
            .then( (e) => {
                console.log(e);
                this.fail("expected a failure to occur");
            })
            .catch((e) => {
                this.areIdentical(ErrorRejectBody,e,"expected the correct rejection message");
                this.areIdentical(ParcelStatus.Undeliverable,parcel.parcelStatus,"expected parcel to be undeliverable status");
                this.isFalse(parcelDispatcher.hasParcel(parcel));
            });
        
    }

}