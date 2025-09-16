// Browser console test script
console.log('Testing browser console errors');

// Function to check if a URL is accessible
async function checkUrl(url) {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return {
      url,
      status: response.status,
      ok: response.ok
    };
  } catch (error) {
    return {
      url,
      error: error.message
    };
  }
}

// Check critical resources
Promise.all([
  checkUrl('http://localhost:5000/'),
  checkUrl('http://localhost:5000/assets/index-N6IeE8KG.js'),
  checkUrl('http://localhost:5000/assets/index-DdjovNlI.css'),
  checkUrl('http://localhost:5000/manifest.json'),
  checkUrl('http://localhost:5000/sw.js'),
  checkUrl('http://localhost:5000/og-image.svg'),
  checkUrl('http://localhost:5000/icon-192.svg')
])
.then(results => {
  console.log('Resource check results:', results);
})
.catch(error => {
  console.error('Error checking resources:', error);
});