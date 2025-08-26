import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const TWILIO_API_KEY = Deno.env.get('TWILIO_API_KEY');
    if (!TWILIO_API_KEY) {
      throw new Error('TWILIO_API_KEY is not configured');
    }

    const { to, message, touristId, alertType } = await req.json();
    
    console.log(`Sending SMS alert: ${alertType} for tourist ${touristId}`);

    // Simulate SMS sending (replace with actual Twilio API call when ready)
    const smsResponse = {
      success: true,
      messageId: `msg_${Date.now()}`,
      to: to,
      message: message,
      timestamp: new Date().toISOString()
    };

    // In production, use actual Twilio API:
    /*
    const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_API_KEY}`)`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        From: TWILIO_PHONE_NUMBER,
        To: to,
        Body: message,
      }),
    });
    */

    console.log('SMS sent successfully:', smsResponse);

    return new Response(JSON.stringify(smsResponse), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error sending SMS:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});