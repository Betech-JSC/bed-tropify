// Script để test API send-email
// Chạy: node scripts/test-smtp-api.js

const testData = {
  Name: 'Test User',
  Email: 'test@example.com',
  Phone: '0123456789',
  Message: 'This is a test message from the API test script.',
};

async function testSendEmail() {
  const url = 'http://localhost:3000/api/send-email';

  try {
    console.log('🚀 Testing SMTP API...\n');
    console.log('📤 Sending request to:', url);
    console.log('\n📋 Form Data to be sent:');
    console.log('   Name:', testData.Name);
    console.log('   Email:', testData.Email);
    console.log('   Phone:', testData.Phone);
    console.log('   Message:', testData.Message);
    console.log('\n📝 JSON Payload:', JSON.stringify(testData, null, 2));
    console.log('\n---\n');

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    const data = await response.json();

    console.log('📊 Response Status:', response.status);
    console.log('📋 Response Data:', JSON.stringify(data, null, 2));
    console.log('\n---\n');

    if (response.ok) {
      console.log('✅ SUCCESS! Email sent successfully!');
      console.log('📧 Check your inbox at RECEIVER_EMAIL address.\n');
    } else {
      console.log('❌ FAILED! Error:', data.message);
      if (data.error) {
        console.log('🔍 Error details:', data.error);
      }
    }
  } catch (error) {
    console.error('❌ ERROR:', error.message);
    console.log('\n💡 Make sure:');
    console.log('   1. Server is running: npm run dev');
    console.log('   2. File .env.local exists and has correct SMTP config');
  }
}

testSendEmail();

