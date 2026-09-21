import { Container } from './Container'

function Line({ w = 'w-full' }) {
  return <div className={`skeleton h-4 ${w} rounded-lg`} />
}

export function SectionSkeleton({ title = true }) {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="space-y-4">
          {title && (
            <div className="space-y-3">
              <div className="skeleton h-4 w-24 rounded-lg" />
              <div className="skeleton h-10 w-72 rounded-xl" />
              <Line w="w-full max-w-xl" />
            </div>
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="skeleton h-32 rounded-2xl" />
            <div className="skeleton h-32 rounded-2xl" />
          </div>
        </div>
      </Container>
    </section>
  )
}

export function ProjectsGridSkeleton() {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="skeleton h-44" />
      ))}
    </div>
  )
}

