import { ParcelDispatcher } from './Dispatch/ParcelDispatcher';

class App {
    public static main(): number {
        console.log('Hello World');
        var parcelDispatcher = new ParcelDispatcher();
        parcelDispatcher.publishAsync(null);
        return 0;
    }
}

App.main();