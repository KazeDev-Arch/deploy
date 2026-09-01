import { createFileRoute } from '@tanstack/react-router'

import { HomeHero } from '../components/home/hero'
import { LatestArticles } from '../components/home/latest-articles'
import { Newsletter } from '../components/home/newsletter'
import { Subscribe } from '../components/home/subscribe'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  return (
    <main>
      <HomeHero />
      <LatestArticles />
      <Subscribe />
      <Newsletter />
    </main>
  )
}
