import { OpenAIStream, OpenAIStreamPayload } from '@/utils/OpenAIStream'

type RequestData = {
  input: string
}

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing env var from OpenAI')
}

export const runtime = 'edge'

export async function POST(request: Request) {
  const { input } = (await request.json()) as RequestData

  function generatePrompt(data: string) {
    const prompt = `
  Generate a regular expression using the following requirements.
  Requirements: The regular expression must match the following pattern - ${data}.
  Result:
  `
    return prompt
  }

  const data = generatePrompt(input)

  if (!data) {
    return new Response('No data in the request', { status: 400 })
  }

  const payload: OpenAIStreamPayload = {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: data }],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 200,
    stream: true,
    n: 1,
  }

  const stream = await OpenAIStream(payload)
  return new Response(stream)
}
