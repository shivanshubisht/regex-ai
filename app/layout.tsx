import './globals.css'
import { Inter as FontSans } from 'next/font/google'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { ThemeProvider } from '@/components/theme-provider'
import { cn } from '@/lib/utils'
import { SiteHeader } from '@/components/site-header'

export const metadata = {
  title: 'Regex AI - Generate Regex Expressions by defining prompts',
  description:
    "Generate Regex Expressions by defining prompts using OpenAI's GPT-3 API",
}

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en' suppressHydrationWarning>
      <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
        <body
          className={cn(
            'min-h-screen bg-white font-sans text-slate-900 antialiased dark:bg-gradient-to-b from-[#191919] to-[#15162c] dark:text-slate-50 flex flex-col items-center',
            fontSans.variable
          )}
        >
          <SiteHeader />
          <main className='flex flex-col items-center'>{children}</main>
          <TailwindIndicator />
        </body>
      </ThemeProvider>
    </html>
  )
}
