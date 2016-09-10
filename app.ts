import { ParcelDispatcher } from './Dispatch/ParcelDispatcher';
import { UpdateHandler } from './Usage/UpdateHandler';
import { ActionType } from './Usage/ActionType';
import { Parcel } from './Parcel/Parcel';
class App {
    public static main(): number {
        console.log('Hello World3');

        var updateHandler = new UpdateHandler();

        var parcelDispatcher = new ParcelDispatcher();
        parcelDispatcher.registerParcelHandler(ActionType.UpdateName,updateHandler);

        parcelDispatcher.publishAsync(ActionType.UpdateName,new Parcel("Bob", { "context var" : "some value"}));
        
        

        return 0;
    }
}

App.main();