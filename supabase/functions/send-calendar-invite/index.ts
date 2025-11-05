import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ConsultationRequest {
  name: string;
  email: string;
  phone: string;
  date: string;
  field: string;
  message?: string;
}

// Function to create calendar event
async function createCalendarEvent(request: ConsultationRequest, accessToken: string) {
  const event = {
    summary: `Consultation: ${request.field} - ${request.name}`,
    description: `
Consultation Request Details:
- Name: ${request.name}
- Email: ${request.email}
- Phone: ${request.phone}
- Field: ${request.field}
- Message: ${request.message || 'No message provided'}
    `.trim(),
    start: {
      dateTime: new Date(request.date).toISOString(),
      timeZone: 'UTC',
    },
    end: {
      dateTime: new Date(new Date(request.date).getTime() + 60 * 60 * 1000).toISOString(), // 1 hour duration
      timeZone: 'UTC',
    },
    attendees: [
      { email: request.email },
      { email: Deno.env.get('COMPANY_EMAIL') },
    ],
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 },
        { method: 'popup', minutes: 30 },
      ],
    },
  };

  const response = await fetch(
    'https://www.googleapis.com/calendar/v3/calendars/primary/events?sendUpdates=all',
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    console.error('Google Calendar API error:', error);
    throw new Error(`Failed to create calendar event: ${error}`);
  }

  return await response.json();
}

// Function to get access token using service account
async function getAccessToken(): Promise<string> {
  const serviceAccount = {
    client_email: Deno.env.get('GOOGLE_CALENDAR_CLIENT_EMAIL'),
    private_key: Deno.env.get('GOOGLE_CALENDAR_PRIVATE_KEY')?.replace(/\\n/g, '\n'),
  };

  if (!serviceAccount.client_email || !serviceAccount.private_key) {
    throw new Error('Missing Google Calendar credentials');
  }

  const now = Math.floor(Date.now() / 1000);
  const expiry = now + 3600;

  const header = {
    alg: 'RS256',
    typ: 'JWT',
  };

  const claim = {
    iss: serviceAccount.client_email,
    scope: 'https://www.googleapis.com/auth/calendar',
    aud: 'https://oauth2.googleapis.com/token',
    exp: expiry,
    iat: now,
  };

  // Create JWT (simplified - in production use a proper JWT library)
  const encoder = new TextEncoder();
  const headerB64 = btoa(JSON.stringify(header));
  const claimB64 = btoa(JSON.stringify(claim));
  const signatureInput = `${headerB64}.${claimB64}`;

  // Import private key
  const pemHeader = '-----BEGIN PRIVATE KEY-----';
  const pemFooter = '-----END PRIVATE KEY-----';
  const pemContents = serviceAccount.private_key
    .replace(pemHeader, '')
    .replace(pemFooter, '')
    .replace(/\s/g, '');
  
  const binaryDer = Uint8Array.from(atob(pemContents), c => c.charCodeAt(0));

  const cryptoKey = await crypto.subtle.importKey(
    'pkcs8',
    binaryDer,
    {
      name: 'RSASSA-PKCS1-v1_5',
      hash: 'SHA-256',
    },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    cryptoKey,
    encoder.encode(signatureInput)
  );

  const signatureB64 = btoa(String.fromCharCode(...new Uint8Array(signature)));
  const jwt = `${signatureInput}.${signatureB64}`;

  // Exchange JWT for access token
  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });

  if (!tokenResponse.ok) {
    const error = await tokenResponse.text();
    console.error('Token exchange error:', error);
    throw new Error(`Failed to get access token: ${error}`);
  }

  const tokenData = await tokenResponse.json();
  return tokenData.access_token;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const consultationRequest: ConsultationRequest = await req.json();
    
    console.log('Processing consultation request for:', consultationRequest.email);

    // Get access token
    const accessToken = await getAccessToken();
    console.log('Successfully obtained access token');

    // Create calendar event
    const event = await createCalendarEvent(consultationRequest, accessToken);
    console.log('Calendar event created:', event.id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        eventId: event.id,
        htmlLink: event.htmlLink 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-calendar-invite function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.toString()
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);