'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Container } from '../../components/Container'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from '../../components/SocialIcons'

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

function SocialLink({ href, icon: Icon, children, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2.5 sm:gap-3 rounded-lg border border-border bg-card p-3 transition-all hover:border-primary/40 hover:bg-secondary/30 hover:shadow-md active:scale-[0.99]"
      >
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-secondary/50 transition-all duration-300 group-hover:bg-primary/10"
        >
          <Icon className="h-5 w-5 sm:h-5.5 sm:w-5.5 fill-muted-foreground transition-colors duration-300 group-hover:fill-primary" />
        </motion.div>
        <div className="flex-1">
          <p className="text-xs sm:text-sm font-medium text-foreground">{children}</p>
        </div>
        <motion.svg
          className="h-4 w-4 flex-shrink-0 text-muted-foreground opacity-50 transition-all duration-300 group-hover:opacity-100"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          whileHover={{ x: 3 }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </motion.svg>
      </Link>
    </motion.div>
  )
}

export default function Contact() {
  return (
    <Container>
      <div className="mx-auto max-w-7xl py-8 sm:py-12">
        {/* Header - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            İletişim
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm text-muted-foreground sm:text-base"
          >
            Benimle iletişime geçmek için aşağıdaki kanalları kullanabilirsiniz.
          </motion.p>
        </motion.div>

        <div className="mx-auto max-w-2xl space-y-8">
          {/* Email */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              href="mailto:contact@mehmettemel.com"
              className="group flex items-center gap-2.5 sm:gap-3 rounded-lg border border-border bg-card p-4 shadow-lg transition-all hover:border-primary/40 hover:bg-secondary/30 hover:shadow-xl active:scale-[0.99]"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/50 transition-all duration-300 group-hover:bg-primary/10"
              >
                <MailIcon className="h-6 w-6 fill-muted-foreground transition-colors duration-300 group-hover:fill-primary" />
              </motion.div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground mb-0.5 sm:text-base">Email</p>
                <p className="text-xs text-muted-foreground truncate sm:text-sm">
                  contact@mehmettemel.com
                </p>
              </div>
              <motion.svg
                className="h-5 w-5 flex-shrink-0 text-muted-foreground opacity-50 transition-all duration-300 group-hover:opacity-100"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                whileHover={{ x: 3 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </motion.svg>
            </Link>
          </motion.div>

          {/* Social Links */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-4 text-center text-lg font-semibold text-foreground sm:text-xl"
            >
              Sosyal Medya
            </motion.h2>
            <div className="space-y-3">
              <SocialLink href="https://x.com/temelbusiness" icon={XIcon} index={0}>
                Twitter / X
              </SocialLink>
              <SocialLink
                href="https://www.instagram.com/mehmettemelim"
                icon={InstagramIcon}
                index={1}
              >
                Instagram
              </SocialLink>
              <SocialLink
                href="https://github.com/mehmettemel"
                icon={GitHubIcon}
                index={2}
              >
                GitHub
              </SocialLink>
              <SocialLink
                href="https://www.linkedin.com/in/mehmettemelim"
                icon={LinkedInIcon}
                index={3}
              >
                LinkedIn
              </SocialLink>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
