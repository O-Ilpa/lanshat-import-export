import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const SMTP_HOST = "smtp.zoho.com";
const SMTP_PORT = parseInt("465");
const SMTP_USER = "o.ilpa@lanshat.com";
const SMTP_PASSWORD = Deno.env.get("SMTP_PASSWORD") as string;
const COMPANY_EMAIL = "omarilpa08@gmail.com";
const FROM_EMAIL = "o.ilpa@lanshat.com";

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

// Function to send calendar invite emails using Nodemailer
async function sendCalendarInvites(request: ConsultationRequest) {
  const icalContent = createICalEvent(request);
  
  const client = new SMTPClient({
    connection: {
      hostname: SMTP_HOST,
      port: SMTP_PORT,
      tls: true,
      auth: {
        username: SMTP_USER,
        password: SMTP_PASSWORD,
      },
    },
  });

  try {
    // Send to client
    await client.send({
      from: FROM_EMAIL,
      to: request.email,
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
          content: icalContent,
          contentType: 'text/calendar',
          encoding: 'text',
        },
      ],
    });

    // Send to company
    await client.send({
      from: FROM_EMAIL,
      to: COMPANY_EMAIL,
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
          content: icalContent,
          contentType: 'text/calendar',
          encoding: 'text',
        },
      ],
    });

    await client.close();
    
    return { success: true };
  } catch (error) {
    await client.close();
    throw error;
  }
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
    await sendCalendarInvites(consultationRequest);
    console.log('Calendar invites sent successfully');

    return new Response(
      JSON.stringify({ 
        success: true
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