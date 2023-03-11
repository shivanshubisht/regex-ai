import Form from '@/components/form'
import { ModeToggle } from '@/components/mode-toggle'

export default function Home() {
  return (
    <div className='max-w-xl w-screen'>
      <div className='mt-8 pb-3 text-center'>
        <h1 className='text-4xl p-3'>RegexAI</h1>
        <p className='text-gray-500 font-medium'>
          Generate Regex Expressions by defining prompts
        </p>
      </div>
      <div>
        <h2 className='text-2xl pt-12 pb-3'>Regex Generator</h2>
        <Form />
      </div>
    </div>
  )
}
