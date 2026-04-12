import { NextRequest, NextResponse } from 'next/server';

const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY;
const MAILERLITE_GROUP_ID = process.env.MAILERLITE_GROUP_ID;

export async function POST(request: NextRequest) {
  try {
    console.log('[POST /api/subscribe] Début du traitement');
    console.log('Clés défini:', { MAILERLITE_API_KEY: !!MAILERLITE_API_KEY, MAILERLITE_GROUP_ID: !!MAILERLITE_GROUP_ID });

    // Validate API configuration
    if (!MAILERLITE_API_KEY || !MAILERLITE_GROUP_ID) {
      console.error('[POST /api/subscribe] Configuration manquante');
      return NextResponse.json(
        { message: 'Configuration manquante. Veuillez contacter l\'administrateur.' },
        { status: 500 }
      );
    }

    // Parse request body
    const body = await request.json();
    console.log('[POST /api/subscribe] Body reçu:', { email: body?.email?.substring(0, 10) });
    const { email } = body;

    // Validate email
    if (!email || typeof email !== 'string') {
      console.warn('[POST /api/subscribe] Email invalide:', typeof email);
      return NextResponse.json(
        { message: 'Email invalide' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.warn('[POST /api/subscribe] Email format invalide:', email);
      return NextResponse.json(
        { message: 'Email invalide' },
        { status: 400 }
      );
    }

    console.log('[POST /api/subscribe] Appel MailerLite API');
    // Call MailerLite API with correct endpoint
    const apiUrl = 'https://connect.mailerlite.com/api/subscribers';
    console.log('[POST /api/subscribe] URL:', apiUrl);

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MAILERLITE_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        email: email.toLowerCase(),
        groups: [MAILERLITE_GROUP_ID],
        status: 'active',
      }),
    });

    const data = await response.json();
    console.log('[POST /api/subscribe] Réponse MailerLite:', response.status, data);

    // Handle MailerLite responses
    if (response.status === 200) {
      // 200 = existing subscriber updated
      console.log('[POST /api/subscribe] Email déjà existant - mis à jour');
      return NextResponse.json(
        { message: 'Cet email est déjà inscrit.' },
        { status: 200 }
      );
    }

    if (response.status === 201) {
      // 201 = new subscriber created
      console.log('[POST /api/subscribe] Succès - nouvel abonné');
      return NextResponse.json(
        { message: 'Inscription réussie !', subscriber: data },
        { status: 201 }
      );
    }

    // Any other status is an error
    console.error('[POST /api/subscribe] MailerLite Error:', response.status, data);
    return NextResponse.json(
      { message: 'Une erreur est survenue lors de l\'inscription.' },
      { status: response.status }
    );
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error('[POST /api/subscribe] Erreur:', errorMsg);
    console.error('[POST /api/subscribe] Stack:', error instanceof Error ? error.stack : error);
    return NextResponse.json(
      { message: 'Une erreur est survenue lors de l\'inscription.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    if (!MAILERLITE_API_KEY || !MAILERLITE_GROUP_ID) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Variables manquantes',
          details: {
            MAILERLITE_API_KEY: MAILERLITE_API_KEY ? '✓ Défini' : '✗ Manquant',
            MAILERLITE_GROUP_ID: MAILERLITE_GROUP_ID ? '✓ Défini' : '✗ Manquant',
          },
        },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://connect.mailerlite.com/api/groups/${MAILERLITE_GROUP_ID}`,
      {
        headers: {
          'Authorization': `Bearer ${MAILERLITE_API_KEY}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Impossible de se connecter à MailerLite',
          details: await response.json(),
        },
        { status: response.status }
      );
    }

    const groupData = await response.json();
    return NextResponse.json({
      status: 'ok',
      message: 'MailerLite connecté avec succès',
      group: {
        id: groupData.data.id,
        name: groupData.data.name,
        subscribersCount: groupData.data.subscribers_count,
      },
    });
  } catch (error) {
    console.error('Test endpoint error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
