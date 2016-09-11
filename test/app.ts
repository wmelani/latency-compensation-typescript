
import * as tsUnit from './tsUnit/tsUnit';
import { ParcelDispatcherTests } from './ParcelDispatcherTests' 

var parcelDispatcherTests = new tsUnit.Test(ParcelDispatcherTests);

// Run the tests
var result = parcelDispatcherTests.run();
// Show the test results (TAP output)
console.log(result.getTapResults());
// Show the test results (Your own custom version)
console.log('Errors: ' + result.errors.length);
