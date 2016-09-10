import { ActionHandler } from './ActionHandler'
import {Promise} from 'es6-promise';

export interface Action {
    type:string;
    context:any;
    value:any;
}

export class UpdateActionHandler implements ActionHandler{

    handle(action:Action):Promise<any> {
        return undefined;
    }
}

