interface SiteConfig {
  name: string
  description: string
  links: {
    twitter: string
    github: string
  }
}

export const siteConfig: SiteConfig = {
  name: 'shivanshubisht/regex-ai',
  description:
    'A simple API to generate regular expressions using OpenAI GPT-3.5 Turbo',
  links: {
    twitter: 'https://twitter.com/bishtshivanshu',
    github: 'https://github.com/shivanshubisht/regex-ai',
  },
}
