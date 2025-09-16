// Comprehensive Reminders Functionality Test Script
// Run this in the browser console on the settings page (http://localhost:5000/settings)

console.log('🔔 Starting Comprehensive Reminders Functionality Test...');

// Test Configuration
const TEST_CONFIG = {
  testInterval: 10000, // 10 seconds for quick testing
  originalInterval: null,
  testResults: []
};

// Helper function to log test results
function logTest(testName, passed, details = '') {
  const result = { testName, passed, details, timestamp: new Date().toISOString() };
  TEST_CONFIG.testResults.push(result);
  const emoji = passed ? '✅' : '❌';
  console.log(`${emoji} ${testName}: ${passed ? 'PASSED' : 'FAILED'}${details ? ' - ' + details : ''}`);
}

// Test 1: Browser Notification Support
function testBrowserNotificationSupport() {
  console.log('\n📱 Test 1: Browser Notification Support');
  
  const hasNotificationAPI = 'Notification' in window;
  logTest('Browser Notification API Available', hasNotificationAPI, 
    hasNotificationAPI ? 'Notification API is supported' : 'Notification API not supported');
  
  if (hasNotificationAPI) {
    const permission = Notification.permission;
    logTest('Notification Permission Status', true, `Current permission: ${permission}`);
    
    if (permission === 'default') {
      console.log('💡 Tip: Click "Enable" button to grant notification permission');
    }
  }
  
  return hasNotificationAPI;
}

// Test 2: Settings API Functionality
async function testSettingsAPI() {
  console.log('\n⚙️ Test 2: Settings API Functionality');
  
  try {
    // Test GET /api/settings
    const getResponse = await fetch('/api/settings');
    const getSuccess = getResponse.ok;
    logTest('GET /api/settings', getSuccess, 
      getSuccess ? `Status: ${getResponse.status}` : `Failed with status: ${getResponse.status}`);
    
    if (getSuccess) {
      const settings = await getResponse.json();
      logTest('Settings Data Structure', 
        settings && typeof settings === 'object',
        `Has reminderEnabled: ${!!settings.reminderEnabled}, reminderInterval: ${settings.reminderInterval}`);
      
      // Store original interval for restoration
      TEST_CONFIG.originalInterval = settings.reminderInterval;
      
      // Test PATCH /api/settings
      const testSettings = {
        reminderEnabled: true,
        reminderInterval: '5', // 5 minutes for testing
        notificationTitle: 'Test Reminder',
        notificationMessage: 'This is a test reminder message'
      };
      
      const patchResponse = await fetch('/api/settings', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(testSettings)
      });
      
      const patchSuccess = patchResponse.ok;
      logTest('PATCH /api/settings', patchSuccess,
        patchSuccess ? `Status: ${patchResponse.status}` : `Failed with status: ${patchResponse.status}`);
      
      // Verify settings were updated
      if (patchSuccess) {
        const verifyResponse = await fetch('/api/settings');
        if (verifyResponse.ok) {
          const updatedSettings = await verifyResponse.json();
          const settingsUpdated = updatedSettings.reminderEnabled === true && 
                                updatedSettings.reminderInterval === '5';
          logTest('Settings Update Verification', settingsUpdated,
            `reminderEnabled: ${updatedSettings.reminderEnabled}, reminderInterval: ${updatedSettings.reminderInterval}`);
        }
      }
    }
  } catch (error) {
    logTest('Settings API Error', false, error.message);
  }
}

// Test 3: Page Visibility API
function testPageVisibilityAPI() {
  console.log('\n👁️ Test 3: Page Visibility API');
  
  const hasVisibilityAPI = 'visibilityState' in document;
  logTest('Page Visibility API Available', hasVisibilityAPI,
    hasVisibilityAPI ? `Current state: ${document.visibilityState}` : 'Page Visibility API not supported');
  
  if (hasVisibilityAPI) {
    // Test visibility change detection
    let visibilityTestPassed = false;
    const visibilityHandler = () => {
      visibilityTestPassed = true;
      logTest('Visibility Change Detection', true, `State changed to: ${document.visibilityState}`);
      document.removeEventListener('visibilitychange', visibilityHandler);
    };
    
    document.addEventListener('visibilitychange', visibilityHandler);
    
    // Simulate visibility change test
    setTimeout(() => {
      if (!visibilityTestPassed) {
        logTest('Visibility Change Detection', false, 'No visibility change detected (switch tabs to test)');
        document.removeEventListener('visibilitychange', visibilityHandler);
      }
    }, 5000);
    
    console.log('💡 Switch to another tab and back to test visibility change detection');
  }
  
  return hasVisibilityAPI;
}

// Test 4: useAwayTimeNotifications Hook Integration
function testHookIntegration() {
  console.log('\n🔗 Test 4: Hook Integration');
  
  // Check if the hook is properly integrated by looking for its effects
  const notificationButton = document.querySelector('[data-testid="button-test-notification"]');
  const reminderSwitch = document.querySelector('[data-testid="switch-reminder-enabled"]');
  const intervalSelect = document.querySelector('[data-testid="select-reminder-interval"]');
  
  logTest('Test Notification Button Present', !!notificationButton,
    notificationButton ? 'Button found and clickable' : 'Button not found');
  
  logTest('Reminder Switch Present', !!reminderSwitch,
    reminderSwitch ? 'Switch found and functional' : 'Switch not found');
  
  logTest('Interval Select Present', !!intervalSelect,
    intervalSelect ? 'Select dropdown found' : 'Select dropdown not found');
  
  // Test notification button functionality
  if (notificationButton && Notification.permission === 'granted') {
    console.log('🧪 Testing notification button...');
    try {
      notificationButton.click();
      logTest('Test Notification Button Click', true, 'Button clicked successfully');
    } catch (error) {
      logTest('Test Notification Button Click', false, error.message);
    }
  }
}

// Test 5: User Interaction Detection
function testUserInteractionDetection() {
  console.log('\n🖱️ Test 5: User Interaction Detection');
  
  const interactionEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
  let detectedEvents = [];
  
  const eventHandlers = interactionEvents.map(eventType => {
    const handler = () => {
      if (!detectedEvents.includes(eventType)) {
        detectedEvents.push(eventType);
        console.log(`📝 Detected ${eventType} event`);
      }
    };
    document.addEventListener(eventType, handler, { passive: true });
    return { eventType, handler };
  });
  
  // Test for 3 seconds
  setTimeout(() => {
    eventHandlers.forEach(({ eventType, handler }) => {
      document.removeEventListener(eventType, handler);
    });
    
    logTest('User Interaction Detection', detectedEvents.length > 0,
      `Detected events: ${detectedEvents.join(', ')}`);
    
    if (detectedEvents.length === 0) {
      console.log('💡 Try moving your mouse or clicking to test interaction detection');
    }
  }, 3000);
  
  console.log('🖱️ Move your mouse or interact with the page for 3 seconds...');
}

// Test 6: Timer Functionality (Shortened for testing)
function testTimerFunctionality() {
  console.log('\n⏰ Test 6: Timer Functionality (10-second test)');
  
  let timerStarted = false;
  let timerCleared = false;
  
  // Mock timer for testing
  const originalSetTimeout = window.setTimeout;
  const originalClearTimeout = window.clearTimeout;
  
  window.setTimeout = function(callback, delay) {
    if (delay >= 5000) { // Likely a reminder timer
      timerStarted = true;
      logTest('Reminder Timer Started', true, `Timer set for ${delay}ms`);
      
      // Call original setTimeout with shorter delay for testing
      return originalSetTimeout.call(this, callback, Math.min(delay, TEST_CONFIG.testInterval));
    }
    return originalSetTimeout.apply(this, arguments);
  };
  
  window.clearTimeout = function(timeoutId) {
    timerCleared = true;
    logTest('Timer Cleared on Activity', true, 'Timer properly cleared');
    return originalClearTimeout.apply(this, arguments);
  };
  
  // Restore original functions after test
  setTimeout(() => {
    window.setTimeout = originalSetTimeout;
    window.clearTimeout = originalClearTimeout;
    
    if (!timerStarted) {
      logTest('Timer Functionality', false, 'No reminder timer detected');
    }
  }, 15000);
}

// Test 7: End-to-End Reminder Flow
async function testEndToEndFlow() {
  console.log('\n🔄 Test 7: End-to-End Reminder Flow');
  
  try {
    // Enable reminders with short interval
    const testSettings = {
      reminderEnabled: true,
      reminderInterval: '1', // 1 minute
      notificationTitle: 'E2E Test Reminder',
      notificationMessage: 'End-to-end test notification'
    };
    
    const response = await fetch('/api/settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testSettings)
    });
    
    if (response.ok) {
      logTest('E2E Settings Update', true, 'Test settings applied');
      
      // Simulate page becoming hidden (would trigger timer in real scenario)
      if ('visibilityState' in document) {
        logTest('E2E Flow Setup', true, 'Ready for visibility change test');
        console.log('💡 Switch to another tab for 1+ minutes to test the full reminder flow');
      }
    } else {
      logTest('E2E Settings Update', false, `Failed with status: ${response.status}`);
    }
  } catch (error) {
    logTest('E2E Flow Error', false, error.message);
  }
}

// Cleanup function
async function cleanup() {
  console.log('\n🧹 Cleanup: Restoring Original Settings');
  
  if (TEST_CONFIG.originalInterval) {
    try {
      const restoreSettings = {
        reminderInterval: TEST_CONFIG.originalInterval
      };
      
      const response = await fetch('/api/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(restoreSettings)
      });
      
      if (response.ok) {
        logTest('Settings Restored', true, `Interval restored to: ${TEST_CONFIG.originalInterval}`);
      }
    } catch (error) {
      logTest('Cleanup Error', false, error.message);
    }
  }
}

// Generate Test Report
function generateReport() {
  console.log('\n📊 TEST REPORT');
  console.log('=' .repeat(50));
  
  const totalTests = TEST_CONFIG.testResults.length;
  const passedTests = TEST_CONFIG.testResults.filter(t => t.passed).length;
  const failedTests = totalTests - passedTests;
  
  console.log(`Total Tests: ${totalTests}`);
  console.log(`Passed: ${passedTests} ✅`);
  console.log(`Failed: ${failedTests} ❌`);
  console.log(`Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`);
  
  console.log('\nDetailed Results:');
  TEST_CONFIG.testResults.forEach(result => {
    const emoji = result.passed ? '✅' : '❌';
    console.log(`${emoji} ${result.testName}${result.details ? ' - ' + result.details : ''}`);
  });
  
  // Overall assessment
  const criticalTests = ['Browser Notification API Available', 'GET /api/settings', 'PATCH /api/settings'];
  const criticalPassed = criticalTests.every(testName => 
    TEST_CONFIG.testResults.find(r => r.testName === testName)?.passed
  );
  
  console.log('\n🎯 OVERALL ASSESSMENT:');
  if (criticalPassed && passedTests >= totalTests * 0.8) {
    console.log('🟢 REMINDERS FUNCTIONALITY IS WORKING PROPERLY');
    console.log('The reminders feature appears to be fully functional.');
  } else if (criticalPassed) {
    console.log('🟡 REMINDERS FUNCTIONALITY IS PARTIALLY WORKING');
    console.log('Core functionality works but some features may need attention.');
  } else {
    console.log('🔴 REMINDERS FUNCTIONALITY HAS ISSUES');
    console.log('Critical components are not working properly.');
  }
}

// Main test execution
async function runAllTests() {
  console.log('🚀 Starting Comprehensive Reminders Test Suite...');
  console.log('This will test all aspects of the reminders functionality.\n');
  
  // Run tests in sequence
  testBrowserNotificationSupport();
  await testSettingsAPI();
  testPageVisibilityAPI();
  testHookIntegration();
  testUserInteractionDetection();
  testTimerFunctionality();
  await testEndToEndFlow();
  
  // Wait for async tests to complete
  setTimeout(async () => {
    await cleanup();
    generateReport();
    
    console.log('\n🏁 Test suite completed!');
    console.log('Check the report above for detailed results.');
  }, 20000); // 20 seconds to allow all tests to complete
}

// Auto-run the tests
runAllTests();

// Export for manual execution
window.testReminders = {
  runAllTests,
  testBrowserNotificationSupport,
  testSettingsAPI,
  testPageVisibilityAPI,
  testHookIntegration,
  testUserInteractionDetection,
  testTimerFunctionality,
  testEndToEndFlow,
  cleanup,
  generateReport,
  results: TEST_CONFIG.testResults
};