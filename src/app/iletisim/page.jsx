import Link from 'next/link'
import { Container } from '../../components/Container'

export default function Contact() {
  const links = [
    { href: 'mailto:mehmettemel789@gmail.com', label: 'Email' },
    { href: 'https://x.com/temelbusiness', label: 'Twitter / X' },
    { href: 'https://www.instagram.com/mehmettemelim', label: 'Instagram' },
    { href: 'https://github.com/mehmettemel', label: 'GitHub' },
    {
      href: 'https://www.linkedin.com/in/mehmettemelim',
      label: 'LinkedIn',
    },
  ]

  return (
    <Container>
      <div className="mx-auto max-w-7xl py-8 sm:py-12">
        <div className="mb-8 text-center">
          <h1 className="mb-3 text-xl font-bold tracking-tight text-foreground">
            İletişim
          </h1>
        </div>

        <div className="mx-auto w-full max-w-md space-y-3">
          {links.map((link) => (
            <div key={link.href} className="w-full text-center">
              <Link
                href={link.href}
                target={
                  link.href.startsWith('http') ? '_blank' : undefined
                }
                rel={
                  link.href.startsWith('http')
                    ? 'noopener noreferrer'
                    : undefined
                }
                className="block w-full text-xs font-normal text-foreground transition-opacity hover:opacity-60"
              >
                {link.label}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Container>
  )
}
