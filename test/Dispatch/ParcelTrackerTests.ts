import { ParcelDispatcher } from '../../src/Dispatch/ParcelDispatcher';
import { ParcelTracker, RetryableParcelTracker, TrackedParcel } from '../../src/Dispatch/ParcelTracker';
import { Parcel } from '../../src/Parcel/Parcel';

import { UpdateHandler } from '../models/UpdateHandler';
import { DefaultParcelTracker } from '../models/ParcelTracker';
import { ActionType } from '../models/ActionType';

import * as tsUnit from '../tsUnit/tsUnit';


export class ParcelTrackerTests extends tsUnit.TestClass {
    canCreateParcelTracker(){
        this.doesNotThrow( () => new DefaultParcelTracker(), "should be able to create a parcel tracker");

    }
    canCreateRetryableParcelTracker(){
          this.doesNotThrow( () => new RetryableParcelTracker(new ParcelDispatcher()), "should be able to create a retryable parcel tracker");
    }
    willThrowWhenCreatingRetryableParcelTrackerWithoutParcelDispatcher(){
          this.throws( () => new RetryableParcelTracker(null), "should throw with a null parcel dispatcher");
    }
    parcelListsInitializesToEmptyArrays(){
        var parcelTracker = new RetryableParcelTracker(new ParcelDispatcher());
        this.isTrue(parcelTracker.trackedParcels.length == 0, "tracked parcels array should start empty");
        this.isTrue(parcelTracker.failedParcels.length == 0, "failed parcels array should start empty");
    }
}