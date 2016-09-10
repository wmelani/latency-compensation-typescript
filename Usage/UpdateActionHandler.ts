import { Action } from '../Actions/Action'
import { ActionHandler } from '../Actions/ActionHandler'



export class UpdateActionHandler implements ActionHandler{

    handle(action:Action):Promise<any> {
        console.log("Handled");
        return new Promise((resolve,reject)=> {
            console.log("done");
            resolve("Done");
        });
    }
}
