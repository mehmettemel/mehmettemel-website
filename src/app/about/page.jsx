import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from '@/components/SocialIcons'
import portraitImage from '@/images/avatar.jpg'

function SocialLink({ className, href, children, icon: Icon }) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

export const metadata = {
  title: 'About Mehmet Temel - Front End Engineer & Travel Enthusiast',
  description:
    'Learn more about Mehmet Temel, a Front End Engineer based in Adana, Turkey. Specializing in React, Vue.js, and e-commerce development. Passionate about travel, food, and creating exceptional digital experiences.',
  keywords: [
    'Mehmet Temel',
    'Front End Engineer',
    'React Developer',
    'Vue.js Developer',
    'E-commerce Developer',
    'Travel Blogger',
    'Food Blogger',
    'Adana',
    'Turkey',
    'Frontend Development',
  ],
  openGraph: {
    title: 'About Mehmet Temel - Front End Engineer & Travel Enthusiast',
    description:
      'Learn more about Mehmet Temel, a Front End Engineer based in Adana, Turkey. Specializing in React, Vue.js, and e-commerce development.',
    url: 'https://mehmettemel.com/about',
    type: 'profile',
  },
  twitter: {
    title: 'About Mehmet Temel - Front End Engineer & Travel Enthusiast',
    description:
      'Learn more about Mehmet Temel, a Front End Engineer based in Adana, Turkey.',
  },
}

export default function About() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src={portraitImage}
              alt=""
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-contain dark:bg-zinc-800"
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            Mehmet Temel
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p>
              Hey there! I&apos;m a front-end developer with 4+ years of
              crafting pixel-perfect, user-friendly apps that (hopefully) make
              people smile. By day, I wrestle with React, Next.js, and Vue to
              build digital experiences; by night, I&apos;m either bachata
              dancing my heart out (5+ years of Latin dance vibes!) or planning
              my next adventure to a corner of the world I haven&apos;t explored
              yet.
            </p>
            <p>
              I&apos;m a self-proclaimed culture geek who&apos;s obsessed with
              diving into new countries, tasting their food (tastier, the
              better!), and having deep, soul-stirring chats with strangers who
              become friends. Whether it&apos;s learning why a dish is cooked a
              certain way or debating life&apos;s big questions over coffee,
              I&apos;m all about collecting stories and moments that stick with
              you forever.
            </p>
            <p>
              When I&apos;m not coding or globe-trotting, you&apos;ll find me
              nerding out over psychology, trying to figure out what makes us
              humans tick, or burning the dance floor with a cha-cha or two.
              Life&apos;s too short for boring experiences, so I&apos;m here to
              code, dance, eat, and explore my way through it—one unforgettable
              memory at a time.
            </p>
            <p className="font-bold">
              I&apos;m always up for a deep conversation on any topic.
            </p>
          </div>
        </div>
        <div className="lg:pl-20">
          <ul role="list">
            <SocialLink href="https://x.com/temelbusiness" icon={XIcon}>
              Follow on X
            </SocialLink>
            <SocialLink
              href="https://www.instagram.com/mehmettemelim"
              icon={InstagramIcon}
              className="mt-4"
            >
              Follow on Instagram
            </SocialLink>
            <SocialLink
              href="https://github.com/mehmettemel"
              icon={GitHubIcon}
              className="mt-4"
            >
              Follow on GitHub
            </SocialLink>
            <SocialLink
              href="https://www.linkedin.com/in/mehmettemel"
              icon={LinkedInIcon}
              className="mt-4"
            >
              Follow on LinkedIn
            </SocialLink>
            <SocialLink
              href="mailto:mehmet@mehmettemel.com"
              icon={MailIcon}
              className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
            >
              mehmet@mehmettemel.com
            </SocialLink>
          </ul>
        </div>
      </div>
    </Container>
  )
}
