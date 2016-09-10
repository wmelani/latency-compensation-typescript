import { Action } from '../Actions/Action';
export class ActionTypes{
    static UpdateName:any = { "Update" : "Update Name"};
}

export class UpdateNameAction implements Action {
    type:any;
    context:any;
    value:any;
    constructor(newName:string, context:any){
       this.context = context;
       this.value = newName;
       this.type = ActionTypes.UpdateName;
    }
    
}