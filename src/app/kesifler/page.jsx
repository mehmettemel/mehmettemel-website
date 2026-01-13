'use client'

import { motion } from 'framer-motion'
import { Container } from '../../components/Container'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs'
import { LinksList } from '../../components/kesifler/LinksList'
import { QuotesList } from '../../components/kesifler/QuotesList'
import { usefulLinks, inspirationalQuotes } from '../../data/kesifler'

export default function Kesifler() {
  return (
    <Container>
      <div className="mx-auto max-w-7xl py-8 sm:py-12">
        {/* Header - Centered with Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center sm:mb-12"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Keşifler
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm text-muted-foreground sm:text-base"
          >
            İnternette bulduğum değerli kaynaklar ve topladığım notlar.
          </motion.p>
        </motion.div>

        {/* Tabs Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Tabs defaultValue="links" className="w-full">
            <div className="mb-6 flex justify-center">
              <TabsList className="inline-flex">
                <TabsTrigger value="links" className="text-xs py-2 px-4 sm:text-sm">
                  📚 Linkler
                </TabsTrigger>
                <TabsTrigger value="notes" className="text-xs py-2 px-4 sm:text-sm">
                  💭 Notlar
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Faydalı Linkler Tab */}
            <TabsContent value="links" className="mt-0">
              <LinksList links={usefulLinks} />
            </TabsContent>

            {/* Notlar ve Alıntılar Tab */}
            <TabsContent value="notes" className="mt-0">
              <QuotesList quotes={inspirationalQuotes} />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </Container>
  )
}
