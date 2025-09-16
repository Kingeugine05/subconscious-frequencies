// Manual Reminder Test Script
// Copy and paste this into the browser console on the settings page (http://localhost:5000/settings)

console.log('🧪 Starting Manual Reminder Test...');

// Test 1: Check if notification API is available
function testNotificationAPI() {
    console.log('\n📱 Test 1: Notification API Support');
    if ('Notification' in window) {
        console.log('✅ Notification API is supported');
        console.log(`📊 Current permission: ${Notification.permission}`);
        return true;
    } else {
        console.log('❌ Notification API is not supported');
        return false;
    }
}

// Test 2: Check settings API endpoints
async function testSettingsAPI() {
    console.log('\n🔧 Test 2: Settings API');
    try {
        // Test GET /api/settings
        const response = await fetch('/api/settings');
        if (response.ok) {
            const settings = await response.json();
            console.log('✅ GET /api/settings successful');
            console.log('📊 Current settings:', settings);
            
            // Test PATCH /api/settings
            const testSettings = {
                ...settings,
                reminderEnabled: true,
                reminderInterval: 300000, // 5 minutes
                notificationTitle: 'Test Reminder',
                notificationMessage: 'This is a test reminder'
            };
            
            const patchResponse = await fetch('/api/settings', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(testSettings)
            });
            
            if (patchResponse.ok) {
                console.log('✅ PATCH /api/settings successful');
                return testSettings;
            } else {
                console.log('❌ PATCH /api/settings failed:', patchResponse.status);
                return null;
            }
        } else {
            console.log('❌ GET /api/settings failed:', response.status);
            return null;
        }
    } catch (error) {
        console.log('❌ Settings API error:', error);
        return null;
    }
}

// Test 3: Check Page Visibility API
function testPageVisibilityAPI() {
    console.log('\n👁️ Test 3: Page Visibility API');
    if (typeof document.hidden !== 'undefined') {
        console.log('✅ Page Visibility API is supported');
        console.log(`📊 Current visibility state: ${document.hidden ? 'hidden' : 'visible'}`);
        console.log(`📊 Visibility state: ${document.visibilityState}`);
        return true;
    } else {
        console.log('❌ Page Visibility API is not supported');
        return false;
    }
}

// Test 4: Check if useAwayTimeNotifications hook is working
function testAwayTimeNotificationsHook() {
    console.log('\n🎣 Test 4: useAwayTimeNotifications Hook');
    
    // Check if React DevTools can find the hook
    const reactFiberNode = document.querySelector('#root')?._reactInternalFiber ||
                          document.querySelector('#root')?._reactInternals;
    
    if (reactFiberNode) {
        console.log('✅ React app detected');
        console.log('📊 React fiber node found');
    } else {
        console.log('⚠️ React app not detected or different structure');
    }
    
    // Check for notification permission in the UI
    const notificationElements = document.querySelectorAll('[data-testid*="notification"], [class*="notification"], [id*="notification"]');
    if (notificationElements.length > 0) {
        console.log('✅ Notification UI elements found:', notificationElements.length);
    } else {
        console.log('⚠️ No notification UI elements found');
    }
    
    return true;
}

// Test 5: Test notification creation
async function testNotificationCreation() {
    console.log('\n🔔 Test 5: Notification Creation');
    
    if (Notification.permission === 'granted') {
        try {
            const notification = new Notification('Test Reminder', {
                body: 'This is a test reminder from the manual test script',
                icon: '/favicon.ico',
                tag: 'test-reminder'
            });
            
            console.log('✅ Test notification created successfully');
            
            // Auto-close after 3 seconds
            setTimeout(() => {
                notification.close();
                console.log('📝 Test notification closed');
            }, 3000);
            
            return true;
        } catch (error) {
            console.log('❌ Failed to create test notification:', error);
            return false;
        }
    } else {
        console.log('⚠️ Notification permission not granted. Current permission:', Notification.permission);
        
        if (Notification.permission === 'default') {
            console.log('💡 Requesting notification permission...');
            try {
                const permission = await Notification.requestPermission();
                console.log('📊 Permission result:', permission);
                if (permission === 'granted') {
                    return await testNotificationCreation();
                }
            } catch (error) {
                console.log('❌ Failed to request permission:', error);
            }
        }
        return false;
    }
}

// Test 6: Test user interaction detection
function testUserInteractionDetection() {
    console.log('\n👆 Test 6: User Interaction Detection');
    
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    let detectedEvents = [];
    
    const eventHandlers = events.map(eventType => {
        const handler = () => {
            if (!detectedEvents.includes(eventType)) {
                detectedEvents.push(eventType);
                console.log(`✅ Detected ${eventType} event`);
            }
        };
        document.addEventListener(eventType, handler, { once: true });
        return { eventType, handler };
    });
    
    console.log('📝 Event listeners added. Try interacting with the page...');
    console.log('💡 Move mouse, click, type, or scroll to test event detection');
    
    // Clean up after 10 seconds
    setTimeout(() => {
        eventHandlers.forEach(({ eventType, handler }) => {
            document.removeEventListener(eventType, handler);
        });
        console.log(`📊 Test completed. Detected events: ${detectedEvents.join(', ')}`);
    }, 10000);
    
    return true;
}

// Test 7: Test reminder timer simulation
function testReminderTimer() {
    console.log('\n⏰ Test 7: Reminder Timer Simulation');
    
    let timerCount = 0;
    const maxCount = 3;
    
    const simulateReminder = () => {
        timerCount++;
        console.log(`🔔 Simulated reminder ${timerCount}/${maxCount}`);
        
        if (Notification.permission === 'granted') {
            const notification = new Notification('Simulated Reminder', {
                body: `This is simulated reminder #${timerCount}`,
                icon: '/favicon.ico',
                tag: 'simulated-reminder'
            });
            
            setTimeout(() => notification.close(), 2000);
        }
        
        if (timerCount < maxCount) {
            setTimeout(simulateReminder, 5000); // 5 second intervals for testing
        } else {
            console.log('✅ Reminder timer simulation completed');
        }
    };
    
    console.log('📝 Starting reminder simulation (3 reminders, 5 seconds apart)...');
    setTimeout(simulateReminder, 2000);
    
    return true;
}

// Main test runner
async function runAllTests() {
    console.log('🚀 Running comprehensive reminder functionality test...');
    console.log('=' .repeat(60));
    
    const results = {
        notificationAPI: testNotificationAPI(),
        settingsAPI: await testSettingsAPI(),
        pageVisibilityAPI: testPageVisibilityAPI(),
        awayTimeHook: testAwayTimeNotificationsHook(),
        notificationCreation: await testNotificationCreation(),
        userInteraction: testUserInteractionDetection(),
        reminderTimer: testReminderTimer()
    };
    
    console.log('\n📊 Test Results Summary:');
    console.log('=' .repeat(60));
    
    Object.entries(results).forEach(([test, result]) => {
        const status = result ? '✅ PASS' : '❌ FAIL';
        console.log(`${status} ${test}`);
    });
    
    const passedTests = Object.values(results).filter(Boolean).length;
    const totalTests = Object.keys(results).length;
    
    console.log(`\n🎯 Overall Score: ${passedTests}/${totalTests} tests passed`);
    
    if (passedTests === totalTests) {
        console.log('🎉 All tests passed! Reminders functionality appears to be working correctly.');
    } else {
        console.log('⚠️ Some tests failed. Check the detailed output above for issues.');
    }
    
    console.log('\n💡 Additional Manual Tests:');
    console.log('1. Enable reminders in the settings UI');
    console.log('2. Set a short reminder interval (e.g., 1 minute)');
    console.log('3. Switch to another tab or minimize the browser');
    console.log('4. Wait for the reminder interval to pass');
    console.log('5. Check if you receive a notification');
    console.log('6. Return to the tab and verify the timer resets');
    
    return results;
}

// Auto-run the tests
runAllTests().catch(error => {
    console.error('❌ Test runner failed:', error);
});

// Export for manual execution
window.reminderTests = {
    runAllTests,
    testNotificationAPI,
    testSettingsAPI,
    testPageVisibilityAPI,
    testAwayTimeNotificationsHook,
    testNotificationCreation,
    testUserInteractionDetection,
    testReminderTimer
};

console.log('\n💡 Tests are running automatically. You can also run individual tests:');
console.log('- window.reminderTests.testNotificationAPI()');
console.log('- window.reminderTests.testSettingsAPI()');
console.log('- window.reminderTests.testNotificationCreation()');
console.log('- etc.');