import { Action } from './Action';

export interface ActionHandler{
    handle(action:Action):Promise<any>;
}