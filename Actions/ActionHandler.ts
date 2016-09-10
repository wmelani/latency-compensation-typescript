import { Action } from './Action';
import {Promise} from 'es6-promise';
export interface ActionHandler{
    handle(action:Action):Promise<any>;
}