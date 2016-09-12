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

    public canHandleMultiplePromisesWithStatus() {
        var parcelDispatcher = new ParcelDispatcher();
        var updateHandler = new WaitingUpdateHandler();
        var parcel1 = new Parcel(1000,"context1");
        var parcel2 = new Parcel(2000,"context2");
        var parcel3 = new Parcel(3000,"context3");
        parcelDispatcher.registerParcelHandler(ActionType.UpdateName,updateHandler);
        var promise1 = parcelDispatcher.publishAsync(ActionType.UpdateName,parcel1);
        var promise2 = parcelDispatcher.publishAsync(ActionType.UpdateName,parcel2);
        var promise3 = parcelDispatcher.publishAsync(ActionType.UpdateName,parcel3);
        
        return new Promise((res,rej) => {
            let times = 0;
            let interval = setInterval(() => {
                console.log(`parcel1 - ${parcel1.parcelStatus} parcel2 - ${parcel2.parcelStatus}, parcel3 - ${parcel3.parcelStatus}`)
                if (parcel1.parcelStatus == ParcelStatus.Delivered 
                    && parcel2.parcelStatus == ParcelStatus.Delivered 
                    && parcel3.parcelStatus === ParcelStatus.Delivered){
                    res("finished");
                    clearInterval(interval);
                }
                if (times > 10){
                    rej("promise status did not resolve in enough time.");
                }
                times++;
            },500);
        });
        
    }

}