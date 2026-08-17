export const runtime = 'nodejs';

const SARVAM_TTS_URL = 'https://api.sarvam.ai/text-to-speech';
const DEFAULT_SPEAKER = process.env.SARVAM_SPEAKER || 'ratan';

export async function POST(request) {
  try {
    const { text, speaker = DEFAULT_SPEAKER } = await request.json();
    const cleanText = typeof text === 'string' ? text.trim() : '';

    if (!cleanText) {
      return Response.json({ error: 'Text is required.' }, { status: 400 });
    }

    if (!process.env.SARVAM_API_KEY) {
      return Response.json({ error: 'Sarvam voice is not configured on the server.' }, { status: 503 });
    }

    const sarvamResponse = await fetch(SARVAM_TTS_URL, {
      method: 'POST',
      headers: {
        'api-subscription-key': process.env.SARVAM_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: cleanText.slice(0, 2400),
        target_language_code: 'en-IN',
        speaker,
        model: 'bulbul:v3',
        pace: 0.82,
        temperature: 0.72,
        speech_sample_rate: 24000,
        output_audio_codec: 'mp3'
      })
    });

    const payload = await sarvamResponse.json().catch(() => ({}));

    if (!sarvamResponse.ok) {
      return Response.json(
        { error: payload.error?.message || payload.message || 'Sarvam voice generation failed.' },
        { status: sarvamResponse.status }
      );
    }

    const audioContent = payload.audios?.[0];

    if (!audioContent) {
      return Response.json({ error: 'Sarvam did not return audio.' }, { status: 502 });
    }

    return Response.json({
      audioContent,
      mimeType: 'audio/mpeg',
      model: 'bulbul:v3',
      speaker
    });
  } catch (error) {
    return Response.json({ error: 'Voice generation failed.' }, { status: 500 });
  }
}
