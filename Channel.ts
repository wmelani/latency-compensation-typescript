import { Action } from './Actions/Action';
import { ParcelDispatcher } from './Dispatch/ParcelDispatcher';

export class Channel {
    dispatcher:ParcelDispatcher;
    constructor(dispatcher:ParcelDispatcher){
        this.dispatcher = dispatcher;
    }
    publishAsync(action:Action){
        this.dispatcher.publishAsync(action);
    }
}