# BrainwaveSync Frontend Test Orchestrator

## Overview

This project implements a comprehensive Frontend Test Orchestrator that runs **full end-to-end tests** against the real frontend, backend, and network infrastructure. The test suite is designed to validate every aspect of the application without using mocks, fakes, or placeholders.

## Key Features

- **Real System Testing**: Tests against actual running services, not simulations
- **Comprehensive Test Coverage**:
  - Static analysis (linting, TypeScript, bundle size)
  - Unit tests with high coverage targets
  - Integration tests with real backend connections
  - Cross-browser/device E2E testing
  - Accessibility compliance
  - Performance and Core Web Vitals
  - Visual regression across breakpoints and themes
  - Network resilience and offline capabilities
  - Chaos engineering and system resilience
- **Detailed Reporting**: Generates prioritized defect reports with reproduction steps and fix suggestions

## Test Battery

1. **Static Checks**
   - Linting and TypeScript strict mode
   - Dead code and circular dependency detection
   - Bundle size analysis

2. **Unit Tests**
   - Component, hook, and utility testing
   - Coverage targets: 100% functions, ≥95% lines/branches

3. **Integration Tests**
   - Real API flows and authentication
   - File uploads, pagination, and caching

4. **End-to-End Tests**
   - Cross-browser: Chromium, Firefox, WebKit
   - Cross-device: Desktop, mobile, tablet
   - User flows: signup, login, navigation, data mutations

5. **Accessibility**
   - axe-core compliance testing
   - Keyboard navigation and screen reader compatibility

6. **Performance**
   - Lighthouse CI metrics
   - Core Web Vitals: LCP, CLS, INP

7. **Visual Regression**
   - Screenshot comparison across breakpoints
   - Theme testing: light, dark, high contrast

8. **Network & Offline**
   - Network throttling (2G, 3G, 4G)
   - Offline capability and recovery

9. **Chaos & Resilience**
   - Backend failures and restarts
   - Database errors and service unavailability

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn
- Running frontend application
- Running backend services
- Playwright installed (`npm install -g playwright && npx playwright install`)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/brainwavesync.git
cd brainwavesync

# Install dependencies
npm install

# Install test dependencies
npm install playwright @axe-core/playwright lighthouse puppeteer pixelmatch pngjs eslint typescript madge
```

### Running Tests

```bash
# Start the backend server
npm run start:backend

# In another terminal, start the frontend
npm run start:frontend

# In a third terminal, run the test orchestrator
node scripts/frontend-test-orchestrator.js
```

### Configuration

You can customize the test run with command-line options:

```bash
node scripts/frontend-test-orchestrator.js --frontend-url http://localhost:8080 --backend-url http://localhost:3001 --browsers chromium,firefox
```

See `scripts/README.md` for detailed configuration options.

## Test Report

After running the tests, a comprehensive report is generated at `./test-artifacts/FRONTEND_TEST_REPORT.md`. This report includes:

- Executive summary with overall status
- Environment details and test coverage
- Results for each test category
- Prioritized defect list (S0-S3) with reproduction steps
- Screenshots, videos, and other artifacts

## Project Structure

```
scripts/
├── frontend-test-orchestrator.js  # Main orchestrator
├── static-checks.js               # Linting and static analysis
├── unit-tests.js                  # Component and utility tests
├── integration-tests.js           # API and backend integration
├── e2e-tests.js                   # Cross-browser/device testing
├── a11y-tests.js                  # Accessibility testing
├── performance-tests.js           # Lighthouse and Core Web Vitals
├── visual-regression-tests.js     # Screenshot comparison
├── network-tests.js               # Offline and throttling tests
├── chaos-tests.js                 # Resilience testing
├── report-generator.js            # Test report generation
└── README.md                      # Detailed documentation
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT