import { createFileRoute, Outlet } from '@tanstack/react-router'
import Footer from '../components/Footer'
import Header from '../components/Header'

export const Route = createFileRoute('/_public')({
  component: PublicLayout,
})

/**
 * Layout des pages publiques du site (avec Header + Footer).
 * L'admin / tableau de bord vit en dehors de cette coquille
 * (voir `_dashboard.tsx`) pour ne pas hériter du chrome public.
 */
function PublicLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}
