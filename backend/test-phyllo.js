const axios = require('axios');
require('dotenv').config();

const PHYLLO_ENVIRONMENT = process.env.PHYLLO_ENVIRONMENT || 'sandbox';
const PHYLLO_BASE_URL = 'https://api.staging.getphyllo.com/v1';
const PHYLLO_CLIENT_ID = process.env.PHYLLO_CLIENT_ID;
const PHYLLO_CLIENT_SECRET = process.env.PHYLLO_CLIENT_SECRET;

async function testPhylloAuth() {
  try {
    console.log('Testing Phyllo Authentication...');
    console.log('Client ID:', PHYLLO_CLIENT_ID);
    console.log('Client Secret:', PHYLLO_CLIENT_SECRET ? '***' + PHYLLO_CLIENT_SECRET.slice(-4) : 'NOT SET');
    console.log('Base URL:', PHYLLO_BASE_URL);
    console.log('Environment:', PHYLLO_ENVIRONMENT);
    
    // Basic Auth: Base64 encode "client_id:client_secret"
    const authString = `${PHYLLO_CLIENT_ID}:${PHYLLO_CLIENT_SECRET}`;
    const base64Auth = Buffer.from(authString).toString('base64');
    console.log('\nAuth Header:', 'Basic ' + base64Auth.substring(0, 20) + '...');
    
    console.log('\n=== Attempting to create test user ===');
    console.log('Full URL:', `${PHYLLO_BASE_URL}/users`);
    
    const response = await axios.post(`${PHYLLO_BASE_URL}/users`, {
      name: 'Test User',
      external_id: 'test_' + Date.now()
    }, {
      headers: {
        'Authorization': `Basic ${base64Auth}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ Success! Test user created');
    console.log('User ID:', response.data.id);
    console.log('External ID:', response.data.external_id);
    
    return response.data;
  } catch (error) {
    console.error('❌ Error testing Phyllo:');
    console.error('Status:', error.response?.status);
    console.error('Response:', JSON.stringify(error.response?.data, null, 2));
    throw error;
  }
}

testPhylloAuth()
  .then(() => {
    console.log('\n✅ Phyllo authentication test passed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Phyllo authentication test failed!');
    process.exit(1);
  });
