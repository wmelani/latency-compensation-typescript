import { ParcelDispatcher } from '../../src/Dispatch/ParcelDispatcher';
import { ParcelTracker,RetryableParcelTracker } from '../../src/Dispatch/ParcelTracker';
import { Parcel } from '../../src/Parcel/Parcel';

import { UpdateHandler } from '../models/UpdateHandler';
import { DefaultParcelTracker } from '../models/ParcelTracker';
import { ActionType } from '../models/ActionType';

import * as tsUnit from '../tsUnit/tsUnit';


export class ParcelDispatcherTests extends tsUnit.TestClass {
    canCreateParcelDispatcher(){
        var parcelDispatcher = new ParcelDispatcher();
        this.doesNotThrow( () => new ParcelDispatcher(), "should be able to create a parcel dispatcher");

    }
    canRegisterParcelDispatcher(){
        var parcelDispatcher = new ParcelDispatcher();
        var updateHandler = new UpdateHandler();
        this.doesNotThrow( () => 
            parcelDispatcher.registerParcelHandler(ActionType.UpdateName,updateHandler), "should be able to register a parcel dispatcher");
    }
    canRegisterParcelTracker(){
        var parcelDispatcher = new ParcelDispatcher();
        var parcelTracker = new DefaultParcelTracker();
        this.doesNotThrow( () => 
            parcelDispatcher.registerParcelTracker(parcelTracker), "should be able to register a parcel dispatcher");
    }
    

    shouldThrowIfRegisterParcelDispatcherHasNullActionType(){
        var parcelDispatcher = new ParcelDispatcher();
        var updateHandler = new UpdateHandler();
        this.throws( () => parcelDispatcher.registerParcelHandler(null,updateHandler), "should throw if null action type when registering a parcel dispatcher");
    }
    shouldThrowIfProcessAsyncWithNullParcelType(){
        var parcelDispatcher = new ParcelDispatcher();
        this.throws( () => parcelDispatcher.publishAsync(null,new Parcel("","")),"should throw if process async has a null parcelType");
    }
    shouldThrowIfProcessAsyncWithNullParcel(){
        var parcelDispatcher = new ParcelDispatcher();
        this.throws( () => parcelDispatcher.publishAsync("test",null),"should throw if process async has a null parcel");
    }
    shouldThrowIfProcessAsyncWithNull(){
        var parcelDispatcher = new ParcelDispatcher();
        this.throws( () => parcelDispatcher.publishAsync(null,new Parcel("","")),"should throw if process async has a null parcelType");
    }
    shouldThrowIfNoParcelHandlerAvailable(){
        var parcelDispatcher = new ParcelDispatcher();
        this.throws( () => parcelDispatcher.publishAsync("test",new Parcel("","")),"should throw if no parcel handler available");
    }

}