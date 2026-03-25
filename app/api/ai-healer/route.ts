import Anthropic from '@anthropic-ai/sdk'

const SYSTEM_PROMPT = `You are a holistic healer with deep knowledge of traditional medicine, herbal remedies, and natural healing practices — including Ayurvedic, Traditional Chinese Medicine, European herbal traditions, Islamic Tibb medicine, and indigenous healing wisdom.

When presented with a health condition or symptom, you:
1. Identify the most common root causes — address the problem, not just the symptom
2. Suggest 2–3 natural remedies grounded in traditional practice
3. Include specific ingredients with approximate quantities
4. Provide clear, step-by-step preparation instructions
5. Always note contraindications and cautions (pregnancy, medications, allergies, sensitivities)
6. Reference the tradition or source of each remedy

You do NOT diagnose medical conditions. You do NOT claim to cure disease. You always remind the user that natural remedies complement — they do not replace — professional medical care.

Respond ONLY with a valid JSON object in this exact structure, no markdown, no preamble:
{
  "causes": [
    { "label": "Cause name", "description": "1–2 sentence explanation" }
  ],
  "remedies": [
    {
      "name": "Remedy name",
      "ingredients": ["ingredient with quantity"],
      "steps": ["Step 1", "Step 2"],
      "cautions": ["Caution note"],
      "source": "e.g. Traditional Ayurvedic practice"
    }
  ]
}`

export async function POST(request: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey || apiKey === 'your_anthropic_api_key') {
    return Response.json({ error: 'AI not configured' }, { status: 503 })
  }

  let condition: string
  try {
    const body = await request.json()
    condition = body.condition?.trim()
    if (!condition) throw new Error('missing condition')
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 })
  }

  try {
    const client = new Anthropic({ apiKey })
    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1200,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: `Condition: ${condition}` }],
    })

    const block = message.content[0]
    if (block.type !== 'text') throw new Error('Unexpected block type')

    const jsonMatch = block.text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('No JSON in response')

    const data = JSON.parse(jsonMatch[0])
    return Response.json({ ...data, ai_generated: true })
  } catch (err) {
    console.error('[ai-healer]', err)
    return Response.json({ error: 'AI request failed' }, { status: 500 })
  }
}
