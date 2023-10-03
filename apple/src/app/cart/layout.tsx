export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <span className="badge text-bg-primary">Hyundai Card interest-free event</span>
      {children}
    </div>
  )
}
