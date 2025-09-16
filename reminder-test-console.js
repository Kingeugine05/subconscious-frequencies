/**
 * BrainwaveSync Reminders Functionality Test Script
 * Run this in the browser console on the settings page to test reminders
 * 
 * Instructions:
 * 1. Open http://localhost:5000/settings in your browser
 * 2. Open Developer Tools (F12)
 * 3. Go to Console tab
 * 4. Copy and paste this entire script
 * 5. Press Enter to run
 */

console.log('🔔 BrainwaveSync Reminders Test Script Starting...');

// Test configuration
const TEST_CONFIG = {
    reminderInterval: 1, // 1 minute for testing
    testDuration: 65000, // 65 seconds to test the 1-minute reminder
    notificationTitle: 'Test Reminder - BrainwaveSync',
    notificationMessage: 'This is a test reminder to verify functionality'
};

// Test results storage
const testResults = {
    notificationSupport: false,
    notificationPermission: false,
    settingsAPI: false,
    visibilityAPI: false,
    reminderTimer: false,
    userInteraction: false,
    overallSuccess: false
};

// Utility functions
function logTest(message, success = true) {
    const emoji = success ? '✅' : '❌';
    const style = success ? 'color: green; font-weight: bold;' : 'color: red; font-weight: bold;';
    console.log(`%c${emoji} ${message}`, style);
}

function logInfo(message) {
    console.log(`%c🔍 ${message}`, 'color: blue;');
}

function logWarning(message) {
    console.log(`%c⚠️ ${message}`, 'color: orange;');
}

// Test 1: Browser Notification Support
function testNotificationSupport() {
    logInfo('Testing browser notification support...');
    
    if ('Notification' in window) {
        testResults.notificationSupport = true;
        logTest('Browser supports notifications');
        return true;
    } else {
        logTest('Browser does not support notifications', false);
        return false;
    }
}

// Test 2: Notification Permission
async function testNotificationPermission() {
    logInfo('Testing notification permission...');
    
    if (!('Notification' in window)) {
        logTest('Cannot test permission - notifications not supported', false);
        return false;
    }
    
    const currentPermission = Notification.permission;
    logInfo(`Current permission status: ${currentPermission}`);
    
    if (currentPermission === 'granted') {
        testResults.notificationPermission = true;
        logTest('Notification permission already granted');
        return true;
    } else if (currentPermission === 'denied') {
        logTest('Notification permission denied - cannot test reminders', false);
        return false;
    } else {
        // Request permission
        try {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                testResults.notificationPermission = true;
                logTest('Notification permission granted');
                return true;
            } else {
                logTest('Notification permission not granted', false);
                return false;
            }
        } catch (error) {
            logTest(`Error requesting permission: ${error.message}`, false);
            return false;
        }
    }
}

// Test 3: Settings API
async function testSettingsAPI() {
    logInfo('Testing settings API...');
    
    try {
        // Test GET /api/settings
        const getResponse = await fetch('/api/settings');
        if (!getResponse.ok) {
            logTest(`GET /api/settings failed: ${getResponse.status}`, false);
            return false;
        }
        
        const currentSettings = await getResponse.json();
        logInfo(`Current settings: ${JSON.stringify(currentSettings, null, 2)}`);
        
        // Test PATCH /api/settings - Enable reminders
        const patchResponse = await fetch('/api/settings', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                reminderEnabled: true,
                reminderInterval: TEST_CONFIG.reminderInterval.toString(),
                notificationTitle: TEST_CONFIG.notificationTitle,
                notificationMessage: TEST_CONFIG.notificationMessage
            })
        });
        
        if (!patchResponse.ok) {
            logTest(`PATCH /api/settings failed: ${patchResponse.status}`, false);
            return false;
        }
        
        const updatedSettings = await patchResponse.json();
        logInfo(`Updated settings: ${JSON.stringify(updatedSettings, null, 2)}`);
        
        testResults.settingsAPI = true;
        logTest('Settings API working correctly');
        return true;
        
    } catch (error) {
        logTest(`Settings API error: ${error.message}`, false);
        return false;
    }
}

// Test 4: Page Visibility API
function testVisibilityAPI() {
    logInfo('Testing Page Visibility API...');
    
    if (!('visibilitychange' in document)) {
        logTest('Page Visibility API not supported', false);
        return false;
    }
    
    let visibilityTestPassed = false;
    
    const handleVisibilityChange = () => {
        if (document.hidden) {
            logInfo('Page visibility: HIDDEN (user switched away)');
        } else {
            logInfo('Page visibility: VISIBLE (user returned)');
            visibilityTestPassed = true;
        }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Clean up after test
    setTimeout(() => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        if (visibilityTestPassed) {
            testResults.visibilityAPI = true;
            logTest('Page Visibility API working correctly');
        } else {
            logWarning('Page Visibility API not fully tested - switch tabs to verify');
        }
    }, 10000);
    
    logTest('Page Visibility API supported (switch tabs to fully test)');
    return true;
}

// Test 5: User Interaction Detection
function testUserInteractionDetection() {
    logInfo('Testing user interaction detection...');
    
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    let interactionDetected = false;
    
    const handleInteraction = (event) => {
        if (!interactionDetected) {
            interactionDetected = true;
            logTest(`User interaction detected: ${event.type}`);
            testResults.userInteraction = true;
        }
    };
    
    events.forEach(event => {
        document.addEventListener(event, handleInteraction, { once: true });
    });
    
    // Clean up after 10 seconds
    setTimeout(() => {
        events.forEach(event => {
            document.removeEventListener(event, handleInteraction);
        });
        
        if (!interactionDetected) {
            logWarning('User interaction not detected - move mouse or interact with page');
        }
    }, 10000);
    
    logTest('User interaction detection setup complete');
    return true;
}

// Test 6: Reminder Timer and Notification
function testReminderTimer() {
    logInfo(`Testing reminder timer (${TEST_CONFIG.reminderInterval} minute)...`);
    
    if (!testResults.notificationPermission) {
        logTest('Cannot test reminder timer - notification permission not granted', false);
        return false;
    }
    
    let reminderTimer;
    let countdownInterval;
    let timeLeft = TEST_CONFIG.reminderInterval * 60; // Convert to seconds
    
    logInfo(`Reminder will trigger in ${timeLeft} seconds`);
    
    // Countdown display
    countdownInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft > 0) {
            logInfo(`Reminder countdown: ${timeLeft} seconds remaining`);
        } else {
            clearInterval(countdownInterval);
        }
    }, 10000); // Log every 10 seconds
    
    // Set reminder timer
    reminderTimer = setTimeout(() => {
        clearInterval(countdownInterval);
        
        // Show notification
        const notification = new Notification(TEST_CONFIG.notificationTitle, {
            body: TEST_CONFIG.notificationMessage,
            icon: '/favicon.ico',
            tag: 'test-reminder',
            requireInteraction: false
        });
        
        logTest('Reminder notification triggered successfully!');
        testResults.reminderTimer = true;
        
        // Auto-close notification after 8 seconds
        setTimeout(() => {
            notification.close();
            logInfo('Test notification auto-closed');
        }, 8000);
        
        notification.onclick = () => {
            logInfo('Notification clicked - focusing window');
            window.focus();
            notification.close();
        };
        
    }, TEST_CONFIG.reminderInterval * 60 * 1000); // Convert minutes to milliseconds
    
    // Store timer reference for cleanup
    window.testReminderTimer = reminderTimer;
    window.testCountdownInterval = countdownInterval;
    
    logTest('Reminder timer started successfully');
    return true;
}

// Test 7: Simulate Away Time Notifications Hook
function testAwayTimeNotificationsHook() {
    logInfo('Testing away time notifications logic...');
    
    // Simulate the useAwayTimeNotifications hook logic
    let isPageVisible = !document.hidden;
    let reminderTimer = null;
    let lastInteractionTime = Date.now();
    
    const REMINDER_INTERVAL = TEST_CONFIG.reminderInterval * 60 * 1000; // Convert to milliseconds
    
    function startReminderTimer() {
        if (reminderTimer) {
            clearTimeout(reminderTimer);
        }
        
        reminderTimer = setTimeout(() => {
            if (!isPageVisible && testResults.notificationPermission) {
                const notification = new Notification(TEST_CONFIG.notificationTitle, {
                    body: TEST_CONFIG.notificationMessage,
                    icon: '/favicon.ico',
                    tag: 'away-reminder'
                });
                
                logTest('Away time notification triggered!');
                
                setTimeout(() => notification.close(), 8000);
                
                notification.onclick = () => {
                    window.focus();
                    notification.close();
                };
            }
        }, REMINDER_INTERVAL);
    }
    
    function resetReminderTimer() {
        lastInteractionTime = Date.now();
        if (isPageVisible) {
            startReminderTimer();
        }
    }
    
    // Set up event listeners
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    events.forEach(event => {
        document.addEventListener(event, resetReminderTimer);
    });
    
    document.addEventListener('visibilitychange', () => {
        isPageVisible = !document.hidden;
        
        if (isPageVisible) {
            logInfo('Page became visible - clearing reminder timer');
            if (reminderTimer) {
                clearTimeout(reminderTimer);
                reminderTimer = null;
            }
        } else {
            logInfo('Page became hidden - starting reminder timer');
            startReminderTimer();
        }
    });
    
    // Start initial timer if page is visible
    if (isPageVisible) {
        startReminderTimer();
    }
    
    logTest('Away time notifications hook simulation started');
    
    // Clean up after test duration
    setTimeout(() => {
        events.forEach(event => {
            document.removeEventListener(event, resetReminderTimer);
        });
        
        if (reminderTimer) {
            clearTimeout(reminderTimer);
        }
        
        logInfo('Away time notifications test completed');
    }, TEST_CONFIG.testDuration);
    
    return true;
}

// Main test runner
async function runAllTests() {
    console.log('\n🚀 Starting comprehensive reminders functionality test...\n');
    
    // Run tests sequentially
    testNotificationSupport();
    await testNotificationPermission();
    await testSettingsAPI();
    testVisibilityAPI();
    testUserInteractionDetection();
    
    // Only run timer tests if basic functionality works
    if (testResults.notificationSupport && testResults.notificationPermission && testResults.settingsAPI) {
        testReminderTimer();
        testAwayTimeNotificationsHook();
    } else {
        logWarning('Skipping timer tests due to failed prerequisites');
    }
    
    // Generate final report after a delay
    setTimeout(() => {
        generateTestReport();
    }, 15000);
}

// Generate test report
function generateTestReport() {
    console.log('\n📊 REMINDERS FUNCTIONALITY TEST REPORT\n');
    console.log('=' .repeat(50));
    
    Object.entries(testResults).forEach(([test, passed]) => {
        const status = passed ? '✅ PASS' : '❌ FAIL';
        const style = passed ? 'color: green; font-weight: bold;' : 'color: red; font-weight: bold;';
        console.log(`%c${test.padEnd(20)}: ${status}`, style);
    });
    
    const passedTests = Object.values(testResults).filter(Boolean).length;
    const totalTests = Object.keys(testResults).length - 1; // Exclude overallSuccess
    const successRate = Math.round((passedTests / totalTests) * 100);
    
    testResults.overallSuccess = successRate >= 80;
    
    console.log('\n' + '=' .repeat(50));
    console.log(`%cOVERALL RESULT: ${passedTests}/${totalTests} tests passed (${successRate}%)`, 
        testResults.overallSuccess ? 'color: green; font-size: 16px; font-weight: bold;' : 'color: red; font-size: 16px; font-weight: bold;');
    
    if (testResults.overallSuccess) {
        console.log('%c🎉 REMINDERS FUNCTIONALITY IS WORKING CORRECTLY!', 'color: green; font-size: 18px; font-weight: bold;');
    } else {
        console.log('%c⚠️ REMINDERS FUNCTIONALITY HAS ISSUES THAT NEED ATTENTION', 'color: red; font-size: 18px; font-weight: bold;');
    }
    
    // Provide recommendations
    console.log('\n📋 RECOMMENDATIONS:');
    
    if (!testResults.notificationSupport) {
        console.log('• Use a modern browser that supports notifications');
    }
    
    if (!testResults.notificationPermission) {
        console.log('• Grant notification permissions in browser settings');
    }
    
    if (!testResults.settingsAPI) {
        console.log('• Check that the backend server is running and accessible');
    }
    
    if (!testResults.visibilityAPI) {
        console.log('• Test page visibility by switching tabs/windows');
    }
    
    if (!testResults.userInteraction) {
        console.log('• Interact with the page (move mouse, click, scroll) during testing');
    }
    
    if (!testResults.reminderTimer) {
        console.log('• Wait for the full reminder interval to test notifications');
    }
    
    console.log('\n🔧 To clean up test timers, run: clearTestTimers()');
}

// Cleanup function
function clearTestTimers() {
    if (window.testReminderTimer) {
        clearTimeout(window.testReminderTimer);
        delete window.testReminderTimer;
    }
    
    if (window.testCountdownInterval) {
        clearInterval(window.testCountdownInterval);
        delete window.testCountdownInterval;
    }
    
    logInfo('Test timers cleared');
}

// Make cleanup function globally available
window.clearTestTimers = clearTestTimers;

// Auto-start tests
runAllTests();

// Instructions for user
console.log('\n📖 TESTING INSTRUCTIONS:');
console.log('1. Keep this tab active for initial tests');
console.log('2. Switch to another tab/window and return to test visibility detection');
console.log('3. Move your mouse or interact with the page to test interaction detection');
console.log('4. Wait for the reminder timer to complete (1 minute)');
console.log('5. Check the final report for results');
console.log('\n⏱️ Total test duration: ~2 minutes');
console.log('🧹 Run clearTestTimers() to stop all test timers if needed');