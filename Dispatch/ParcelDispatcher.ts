import { Action } from '../Actions/Action';
import { ActionHandler } from '../Actions/ActionHandler';

export class ParcelDispatcher {

    actions:WeakMap;
    actionHandlers:WeakMap;
    constructor(){
        this.actions = new WeakMap<Action,Promise<any>>();
        this.actionHandlers = new WeakMap<string,ActionHandler>();
    }
    publishAsync(action:Action){
        let actionHandler = this.actionHandlers.get(action.type);
        if (actionHandler == null){
            console.error("No action handler available for request",action);
            throw "No action handler available for request";
        }

        this.actions.set(action,actionHandler.handle(action));
    }
    registerActionHandler(actionType:string,actionHandler:ActionHandler){
        this.actionHandlers.set(actionType,actionHandler);
    }
}