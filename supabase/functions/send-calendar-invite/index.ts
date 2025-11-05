import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const COMPANY_EMAIL = Deno.env.get("COMPANY_EMAIL");

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

// Function to create iCal format calendar event
function createICalEvent(request: ConsultationRequest): string {
  const startDate = new Date(request.date);
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1 hour duration
  
  // Format dates to iCal format (YYYYMMDDTHHmmssZ)
  const formatDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Lanshat//Consultation Booking//EN
CALSCALE:GREGORIAN
METHOD:REQUEST
BEGIN:VEVENT
UID:${crypto.randomUUID()}@lanshat.com
DTSTAMP:${formatDate(new Date())}
DTSTART:${formatDate(startDate)}
DTEND:${formatDate(endDate)}
SUMMARY:Consultation: ${request.field} - ${request.name}
DESCRIPTION:Consultation Request Details:\\n- Name: ${request.name}\\n- Email: ${request.email}\\n- Phone: ${request.phone}\\n- Field: ${request.field}\\n- Message: ${request.message || 'No message provided'}
LOCATION:To be determined
STATUS:CONFIRMED
SEQUENCE:0
ORGANIZER;CN=Lanshat:mailto:${COMPANY_EMAIL}
ATTENDEE;CN=${request.name};RSVP=TRUE:mailto:${request.email}
ATTENDEE;CN=Lanshat Team;RSVP=TRUE:mailto:${COMPANY_EMAIL}
BEGIN:VALARM
TRIGGER:-PT24H
ACTION:DISPLAY
DESCRIPTION:Reminder: Consultation in 24 hours
END:VALARM
END:VEVENT
END:VCALENDAR`;

  return icsContent;
}

// Function to send calendar invite emails using Resend API
async function sendCalendarInvites(request: ConsultationRequest) {
  const icalContent = createICalEvent(request);
  const icalBase64 = btoa(icalContent);
  
  // Send to client
  const clientEmailResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: "Lanshat <onboarding@resend.dev>",
      to: [request.email],
      subject: `Consultation Confirmed - ${new Date(request.date).toLocaleDateString()}`,
      html: `
        <h2>Consultation Request Confirmed</h2>
        <p>Dear ${request.name},</p>
        <p>Thank you for booking a consultation with Lanshat. Your request has been received and confirmed.</p>
        
        <h3>Consultation Details:</h3>
        <ul>
          <li><strong>Date:</strong> ${new Date(request.date).toLocaleString()}</li>
          <li><strong>Field:</strong> ${request.field}</li>
          <li><strong>Your Phone:</strong> ${request.phone}</li>
          ${request.message ? `<li><strong>Your Message:</strong> ${request.message}</li>` : ''}
        </ul>
        
        <p>A calendar invite is attached to this email. Please add it to your calendar.</p>
        <p>We will contact you shortly to confirm the exact time and location details.</p>
        
        <p>Best regards,<br>The Lanshat Team</p>
      `,
      attachments: [
        {
          filename: 'consultation.ics',
          content: icalBase64,
        },
      ],
    }),
  });

  if (!clientEmailResponse.ok) {
    const error = await clientEmailResponse.text();
    throw new Error(`Failed to send client email: ${error}`);
  }

  const clientEmail = await clientEmailResponse.json();

  // Send to company
  const companyEmailResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: "Lanshat Bookings <onboarding@resend.dev>",
      to: [COMPANY_EMAIL],
      subject: `New Consultation Request - ${request.name}`,
      html: `
        <h2>New Consultation Request</h2>
        
        <h3>Client Information:</h3>
        <ul>
          <li><strong>Name:</strong> ${request.name}</li>
          <li><strong>Email:</strong> ${request.email}</li>
          <li><strong>Phone:</strong> ${request.phone}</li>
        </ul>
        
        <h3>Consultation Details:</h3>
        <ul>
          <li><strong>Preferred Date:</strong> ${new Date(request.date).toLocaleString()}</li>
          <li><strong>Field:</strong> ${request.field}</li>
          ${request.message ? `<li><strong>Message:</strong> ${request.message}</li>` : ''}
        </ul>
        
        <p>A calendar invite is attached. Please confirm the appointment with the client.</p>
      `,
      attachments: [
        {
          filename: 'consultation.ics',
          content: icalBase64,
        },
      ],
    }),
  });

  if (!companyEmailResponse.ok) {
    const error = await companyEmailResponse.text();
    throw new Error(`Failed to send company email: ${error}`);
  }

  const companyEmail = await companyEmailResponse.json();

  return { clientEmail, companyEmail };
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const consultationRequest: ConsultationRequest = await req.json();
    
    console.log('Processing consultation request for:', consultationRequest.email);

    // Send calendar invites via email
    const result = await sendCalendarInvites(consultationRequest);
    console.log('Calendar invites sent successfully');
    console.log('Client email ID:', result.clientEmail.id);
    console.log('Company email ID:', result.companyEmail.id);

    return new Response(
      JSON.stringify({ 
        success: true,
        clientEmailId: result.clientEmail.id,
        companyEmailId: result.companyEmail.id
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