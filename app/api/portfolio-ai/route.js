export const runtime = 'nodejs';

const MODEL = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';

const portfolioContext = `
Hemant Solanki is an Assistant Manager, AI & Data at Reliance Group in Mumbai, India. He joined Reliance Group in Feb 2026.
He has 6+ years of experience across data analytics, business intelligence, automation, AI products, dashboards, reporting, SQL, Python, R, Tableau, Power BI, Flask, REST APIs, Gemini API, Claude, OpenClaw, LLM pipelines, workflow automation, and data quality systems.
He is building LipiTranslate.in, a founder-led Indic AI product focused on translating full PDFs into Indian languages. LipiTranslate.in is for students, teams, researchers, and knowledge workers who need better access to documents beyond English. The product direction starts with PDF translation and can grow into document intelligence.
Projects: LipiTranslate.in, AI Resume & Job Match Analyzer, NIA Voice Translator, StackIt 2.0, and NIA AI Voice Assistant.
Impact proof: 15+ production Tableau dashboards, 200+ daily stakeholders, 60% reporting time saved through automation, and 30% data accuracy improvement through validation and quality checks.
Why hire Hemant: he combines enterprise analytics delivery, AI automation, LLM workflow building, stakeholder-facing dashboards, and founder-style product ownership. He can connect business problems to practical AI and data systems.
This portfolio includes Hemant.ai, a live Groq-powered portfolio agent that answers recruiter and collaborator questions from Hemant's verified portfolio facts.
Contact: hemantsolanki333@gmail.com, phone +91 86988 34490, LinkedIn https://www.linkedin.com/in/hemant-solanki-366462199/, GitHub https://github.com/earlywinter96.
`;

export async function POST(request) {
  try {
    const { message } = await request.json();
    const cleanMessage = typeof message === 'string' ? message.trim() : '';

    if (!cleanMessage) {
      return Response.json({ error: 'Message is required.' }, { status: 400 });
    }

    if (!process.env.GROQ_API_KEY) {
      return Response.json({ error: 'AI is not configured on the server.' }, { status: 503 });
    }

    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.45,
        max_tokens: 520,
        messages: [
          {
            role: 'system',
            content:
              'You are Hemant.ai, a concise portfolio chatbot. Answer from the provided facts only. Be professional, recruiter-friendly, specific, and useful. For hiring questions, give clear role-fit reasons. Do not claim private or unverifiable details.'
          },
          {
            role: 'user',
            content: `Portfolio facts:\n${portfolioContext}\n\nUser question: ${cleanMessage}`
          }
        ]
      })
    });

    const payload = await groqResponse.json().catch(() => ({}));

    if (!groqResponse.ok) {
      return Response.json(
        { error: payload.error?.message || 'AI response failed.' },
        { status: groqResponse.status }
      );
    }

    const answer = payload.choices?.[0]?.message?.content?.trim();

    return Response.json({
      answer: answer || 'I could not generate a response for that. Please ask another question.',
      model: MODEL
    });
  } catch (error) {
    return Response.json({ error: 'AI request failed.' }, { status: 500 });
  }
}
