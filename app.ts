import { ParcelDispatcher } from './Dispatch/ParcelDispatcher';
import { UpdateActionHandler } from './Usage/UpdateActionHandler';
import { UpdateNameAction, ActionTypes } from './Usage/UpdateNameAction';

class App {
    public static main(): number {
        console.log('Hello World');

        var actionHandler = new UpdateActionHandler();

        var parcelDispatcher = new ParcelDispatcher();
        console.log(ActionTypes.UpdateName);
        parcelDispatcher.registerActionHandler(ActionTypes.UpdateName,actionHandler);

        parcelDispatcher.publishAsync(new UpdateNameAction("Bob",{"main" : 1 }));
        
        

        return 0;
    }
}

App.main();