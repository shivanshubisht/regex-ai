'use client'
import { useRef, useState } from 'react'

const Form = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [response, setResponse] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(inputRef.current!.value)

    const response = await fetch('/api/generate-regex', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: inputRef.current!.value,
      }),
    })

    console.log('Edge function returned.')

    console.log(response)

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    const data = response.body
    if (!data) {
      return
    }

    const reader = data.getReader()
    const decoder = new TextDecoder()
    let done = false

    let currentResponse: string[] = []
    while (!done) {
      const { value, done: doneReading } = await reader.read()
      done = doneReading
      const chunkValue = decoder.decode(value)
      currentResponse = [...currentResponse, chunkValue]
      setResponse(currentResponse)
    }
    // breaks text indent on refresh due to streaming
    // localStorage.setItem('response', JSON.stringify(currentResponse));
    setIsLoading(false)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          name='prompt'
          type='text'
          placeholder='generate regex for'
          className='w-full rounded-md bg-slate-400 dark:placeholder-slate-300 dark:bg-slate-800 px-2 py-5 outline-none placeholder-slate-700'
          ref={inputRef}
          required
        />
        <button
          type='submit'
          className='mt-4 w-full rounded-md bg-slate-300 dark:bg-slate-700 px-8 py-2.5 text-base dark:hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-zinc-600 disabled:cursor-not-allowed disabled:opacity-50'
        >
          Done
        </button>

        <div>{response}</div>
      </form>
    </>
  )
}

export default Form
