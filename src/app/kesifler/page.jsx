'use client'

import { Container } from '../../components/Container'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs'
import { LinksList } from '../../components/kesifler/LinksList'
import { QuotesList } from '../../components/kesifler/QuotesList'
import { usefulLinks, inspirationalQuotes } from '../../data/kesifler'

export default function Kesifler() {
  return (
    <Container>
      <div className="mx-auto max-w-7xl py-12 sm:py-16 lg:py-20">
        {/* Header */}
        <div className="mb-10 sm:mb-14">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-5">
            Keşifler
          </h1>
          <p className="text-lg sm:text-xl leading-relaxed text-muted-foreground max-w-3xl">
            İnternette bulduğum değerli kaynaklar ve topladığım notlar.
          </p>
        </div>

        {/* Tabs Navigation */}
        <Tabs defaultValue="links" className="w-full">
          <TabsList className="w-full grid grid-cols-2 sm:w-auto sm:inline-flex mb-6 sm:mb-8">
            <TabsTrigger value="links" className="text-sm sm:text-base">
              📚 Faydalı Linkler
            </TabsTrigger>
            <TabsTrigger value="notes" className="text-sm sm:text-base">
              💭 Notlarım
            </TabsTrigger>
          </TabsList>

          {/* Faydalı Linkler Tab */}
          <TabsContent value="links" className="mt-0">
            <div className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-2 sm:mb-3">
                Faydalı Kaynaklar
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                Web development, tasarım ve kişisel gelişim hakkında faydalı bulduğum kitaplar, makaleler ve videolar.
              </p>
            </div>
            <LinksList links={usefulLinks} />
          </TabsContent>

          {/* Notlar ve Alıntılar Tab */}
          <TabsContent value="notes" className="mt-0">
            <div className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-2 sm:mb-3">
                Notlar ve Alıntılar
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                İnternetin derinliklerinden topladığım notlar, düşünceler ve ilham veren alıntılar. Seyahat, gıda, sağlık ve daha fazlası...
              </p>
            </div>
            <QuotesList quotes={inspirationalQuotes} />
          </TabsContent>
        </Tabs>
      </div>
    </Container>
  )
}
