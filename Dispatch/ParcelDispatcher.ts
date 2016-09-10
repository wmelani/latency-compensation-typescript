import { Action } from '../Actions/Action';
import { ActionHandler } from '../Actions/ActionHandler';
export class ParcelDispatcher {

    actions:WeakMap<Action,Promise<any>>;
    actionHandlers:WeakMap<any,ActionHandler>;
    constructor(){
        this.actions = new WeakMap<Action,Promise<any>>();
        this.actionHandlers = new WeakMap<any,ActionHandler>();
    }
    publishAsync(action:Action){
        let actionHandler = this.actionHandlers.get(action.type);
        if (actionHandler == null){
            console.error("No action handler available for request",action);
            throw "No action handler available for request";
        }

        this.actions.set(action,actionHandler.handle(action));
    }
    registerActionHandler(actionType:any,actionHandler:ActionHandler){
        this.actionHandlers.set(actionType,actionHandler);
    }
}