
import * as tsUnit from './tsUnit/tsUnit';
import * as tsUnitAsync from './tsUnit/tsUnitAsync';

import { ParcelDispatcherTests } from './Dispatch/ParcelDispatcherTests' 
import { ParcelDispatcherAsyncTests } from './Dispatch/ParcelDispatcherAsyncTests' 

import { ParcelTests } from './Parcel/ParcelTests' 

import { ParcelTrackerTests } from './Dispatch/ParcelTrackerTests' 
import { ParcelTrackerAsyncTests } from './Dispatch/ParcelTrackerAsyncTests' 
var testRunner = new tsUnit.Test(ParcelDispatcherTests,ParcelTests,ParcelTrackerTests);
var asyncTestRunner = new tsUnitAsync.TestAsync(ParcelDispatcherAsyncTests,ParcelTrackerAsyncTests);

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
