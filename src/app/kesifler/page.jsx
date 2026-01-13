'use client'

import { motion } from 'framer-motion'
import { Container } from '../../components/Container'
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '../../components/ui/tabs'
import { LinksList } from '../../components/kesifler/LinksList'
import { QuotesList } from '../../components/kesifler/QuotesList'
import { VideoNotesList } from '../../components/kesifler/VideoNotesList'
import { BookNotesList } from '../../components/kesifler/BookNotesList'
import { usefulLinks, quotes, videoNotes, bookNotes } from '../../data/kesifler'

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
                <TabsTrigger
                  value="links"
                  className="px-3 py-2 text-xs sm:px-4 sm:text-sm"
                >
                  📚 Linkler
                </TabsTrigger>
                <TabsTrigger
                  value="quotes"
                  className="px-3 py-2 text-xs sm:px-4 sm:text-sm"
                >
                  💭 Alıntılar
                </TabsTrigger>
                <TabsTrigger
                  value="video"
                  className="px-3 py-2 text-xs sm:px-4 sm:text-sm"
                >
                  🎬 Video
                </TabsTrigger>
                <TabsTrigger
                  value="books"
                  className="px-3 py-2 text-xs sm:px-4 sm:text-sm"
                >
                  📖 Kitap
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Faydalı Linkler Tab */}
            <TabsContent value="links" className="mt-0">
              <LinksList links={usefulLinks} />
            </TabsContent>

            {/* Alıntılar Tab */}
            <TabsContent value="quotes" className="mt-0">
              <QuotesList quotes={quotes} />
            </TabsContent>

            {/* Video Notları Tab */}
            <TabsContent value="video" className="mt-0">
              <VideoNotesList notes={videoNotes} />
            </TabsContent>

            {/* Kitap Notları Tab */}
            <TabsContent value="books" className="mt-0">
              <BookNotesList notes={bookNotes} />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </Container>
  )
}
