
import * as tsUnit from './tsUnit/tsUnit';
import * as tsUnitAsync from './tsUnit/tsUnitAsync';
import { ParcelDispatcherTests } from './ParcelDispatcherTests' 
import { ParcelDispatcherAsyncTests } from './ParcelDispatcherAsyncTests' 
var testRunner = new tsUnit.Test(ParcelDispatcherTests);
var asyncTestRunner = new tsUnitAsync.TestAsync(ParcelDispatcherAsyncTests);

// Run the tests
var asyncResults = asyncTestRunner.runAsync();
var result = testRunner.run();

asyncResults.then(asyncResults => {
    console.log("Standard Tests:");
    console.log(result.getTapResults());

    console.log("Async Tests:");
    console.log(asyncResults.getTapResults());

    console.log("Total Tests: " + (result.passes.length + result.errors.length + asyncResults.errors.length + asyncResults.passes.length));
    console.log("Success: " + (result.passes.length + asyncResults.passes.length));
    console.log("Error: " + (result.errors.length + asyncResults.errors.length));

    process.exit(0);
});
