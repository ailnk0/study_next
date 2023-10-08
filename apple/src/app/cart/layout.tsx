import { Container } from 'react-bootstrap'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <span className="badge text-bg-primary">Hyundai Card interest-free event</span>
      {children}
    </Container>
  )
}
