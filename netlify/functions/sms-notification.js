/**
 * Netlify Function: SMS Notification via Twilio
 * Triggered on form submission to send SMS to business owner
 * 
 * Environment variables required:
 * - TWILIO_ACCOUNT_SID
 * - TWILIO_AUTH_TOKEN
 * - TWILIO_PHONE_NUMBER (Twilio sender number)
 * - OWNER_PHONE_NUMBER (Your phone number to receive SMS)
 */

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const data = JSON.parse(event.body);
    const { name, phone, email, service, message } = data;

    // Validate required fields
    if (!name || !phone || !service) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          error: 'Missing required fields',
          message: 'Name, phone, and service are required'
        })
      };
    }

    // Get Twilio credentials from environment variables
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioPhone = process.env.TWILIO_PHONE_NUMBER;
    const ownerPhone = process.env.OWNER_PHONE_NUMBER;

    // Check if Twilio is configured
    if (!accountSid || !authToken || !twilioPhone || !ownerPhone) {
      console.log('Twilio not configured. Logging submission instead:');
      console.log({ name, phone, email, service, message });
      
      return {
        statusCode: 200,
        body: JSON.stringify({ 
          message: 'Form submission logged (Twilio not configured)',
          success: true
        })
      };
    }

    // Initialize Twilio client
    const client = require('twilio')(accountSid, authToken);

    // Format the SMS message
    const smsBody = formatSMSMessage({ name, phone, email, service, message });

    // Send SMS
    const twilioResponse = await client.messages.create({
      body: smsBody,
      from: twilioPhone,
      to: ownerPhone
    });

    console.log('SMS sent successfully:', twilioResponse.sid);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST'
      },
      body: JSON.stringify({ 
        message: 'SMS notification sent successfully',
        success: true,
        sid: twilioResponse.sid
      })
    };

  } catch (error) {
    console.error('Error sending SMS:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to send SMS notification',
        message: error.message
      })
    };
  }
};

/**
 * Format the SMS message content
 */
function formatSMSMessage({ name, phone, email, service, message }) {
  const timestamp = new Date().toLocaleString('en-US', {
    timeZone: 'America/Chicago',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  let smsBody = `🧹 URAZ Pro - New Lead!\n\n`;
  smsBody += `Name: ${name}\n`;
  smsBody += `Phone: ${phone}\n`;
  smsBody += `Service: ${formatServiceName(service)}\n`;
  
  if (email) {
    smsBody += `Email: ${email}\n`;
  }
  
  if (message && message.trim()) {
    // Truncate message if too long
    const truncatedMsg = message.length > 100 ? message.substring(0, 97) + '...' : message;
    smsBody += `Message: ${truncatedMsg}\n`;
  }
  
  smsBody += `\nReceived: ${timestamp}\n`;
  smsBody += `Reply to call back!`;

  return smsBody;
}

/**
 * Format service value to readable name
 */
function formatServiceName(service) {
  const serviceNames = {
    'power-washing': 'Power Washing',
    'carpet-cleaning': 'Carpet Cleaning',
    'vehicle-detailing': 'Vehicle Detailing',
    'house-cleaning': 'House Cleaning',
    'commercial-cleaning': 'Commercial Cleaning',
    'window-cleaning': 'Window Cleaning',
    'multiple': 'Multiple Services'
  };
  
  return serviceNames[service] || service;
}