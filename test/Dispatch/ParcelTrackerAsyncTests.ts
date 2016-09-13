import { ParcelDispatcher } from '../../src/Dispatch/ParcelDispatcher';
import { ParcelTracker, RetryableParcelTracker, TrackedParcel } from '../../src/Dispatch/ParcelTracker';
import { Parcel } from '../../src/Parcel/Parcel';

import { UpdateHandler, ErrorRejectUpdateHandler } from '../models/UpdateHandler';
import { DefaultParcelTracker } from '../models/ParcelTracker';
import { ActionType } from '../models/ActionType';

import * as tsUnit from '../tsUnit/tsUnitAsync';

export class ParcelTrackerAsyncTests extends tsUnit.TestClass {
    canTrackParcelStatus(){
        var parcelDispatcher = new ParcelDispatcher();
        var parcelTracker = new RetryableParcelTracker(parcelDispatcher);
        var updateHandler = new UpdateHandler();
        var parcel = new Parcel("contents","context");
        
        parcelDispatcher.registerParcelHandler(ActionType.UpdateName,updateHandler);
        parcelDispatcher.registerParcelTracker(parcelTracker);
        parcelDispatcher.publishAsync(ActionType.UpdateName,parcel);
        this.isTrue(parcelTracker.trackedParcels.length == 1, "expected a tracked parcel to exist");
        this.isTrue(parcelTracker.trackedParcels[0].parcel == parcel, "expected parcel to match");
        this.isTrue(parcelTracker.trackedParcels[0].parcelType == ActionType.UpdateName, "expected parcelType to match");
    }
    canTrackFailedStatus(){
        var parcelDispatcher = new ParcelDispatcher();
        var parcelTracker = new RetryableParcelTracker(parcelDispatcher);
        var updateHandler = new ErrorRejectUpdateHandler();
        var parcel = new Parcel("contents","context");
        
        parcelDispatcher.registerParcelHandler(ActionType.UpdateName,updateHandler);
        parcelDispatcher.registerParcelTracker(parcelTracker);
        return parcelDispatcher.publishAsync(ActionType.UpdateName,parcel)
            .then( (e) => {
                console.log(e);
                this.fail("expected a failure to occur");
            })
            .catch((e) => {
                this.isTrue(parcelTracker.trackedParcels.length == 1, "expected a tracked parcel to exist");
                this.isTrue(parcelTracker.trackedParcels[0].parcel == parcel, "expected parcel to match");
                this.isTrue(parcelTracker.trackedParcels[0].parcelType == ActionType.UpdateName, "expected parcelType to match");
                this.isTrue(parcelTracker.failedParcels.length == 1, "expected a failed parcel to exist");
                this.isTrue(parcelTracker.failedParcels[0].parcel == parcel, "expected parcel to match");
                this.isTrue(parcelTracker.failedParcels[0].parcelType == ActionType.UpdateName, "expected parcelType to match");
            });

        
    }

    canRetryAFailedItemHandler(){
        var parcelDispatcher = new ParcelDispatcher();
        var parcelTracker = new RetryableParcelTracker(parcelDispatcher);
        var updateHandler = new ErrorRejectUpdateHandler();
        var parcel = new Parcel("contents","context");
        
        parcelDispatcher.registerParcelHandler(ActionType.UpdateName,updateHandler);
        parcelDispatcher.registerParcelTracker(parcelTracker);
        return parcelDispatcher.publishAsync(ActionType.UpdateName,parcel)
            .then( (e) => {
                console.log(e);
                this.fail("expected a failure to occur");
            })
            .catch((e) => {
                this.isTrue(parcelTracker.trackedParcels.length == 1, "expected a tracked parcel to exist");
                this.isTrue(parcelTracker.trackedParcels[0].parcel == parcel, "expected parcel to match");
                this.isTrue(parcelTracker.trackedParcels[0].parcelType == ActionType.UpdateName, "expected parcelType to match");
                this.isTrue(parcelTracker.failedParcels.length == 1, "expected a failed parcel to exist");
                this.isTrue(parcelTracker.failedParcels[0].parcel == parcel, "expected parcel to match");
                this.isTrue(parcelTracker.failedParcels[0].parcelType == ActionType.UpdateName, "expected parcelType to match");
                parcelTracker.retry(parcelTracker.failedParcels[0]);
                this.isTrue(parcelTracker.trackedParcels.length == 1, "expected a tracked parcel to exist");
                this.isTrue(parcelTracker.trackedParcels[0].parcel == parcel, "expected parcel to match");
                this.isTrue(parcelTracker.trackedParcels[0].parcelType == ActionType.UpdateName, "expected parcelType to match");
            });

        
    }

}