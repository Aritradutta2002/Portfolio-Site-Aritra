import PortfolioOS from '@/components/PortfolioOS'
import about from '@/content/about.json'
import experience from '@/content/experience.json'
import projects from '@/content/projects.json'

/* The 3D desktop is invisible to crawlers and screen readers, so the same
   content is server-rendered here as real semantic HTML (Plan §8). */
function SemanticContent() {
  const skillGroups = Object.entries(about.skills) as Array<[string, string[]]>

  return (
    <div className="sr-only">
      <h1>
        {about.name} — {about.title}
      </h1>
      <p>
        {about.title} at {about.company}, based in {about.location}.
      </p>
      <p>{about.bio}</p>

      <section>
        <h2>Experience</h2>
        {experience.map((role) => (
          <article key={role.id}>
            <h3>
              {role.role} — {role.org}
            </h3>
            <p>
              {role.period} · {role.location}
            </p>
            <p>{role.summary}</p>
            <ul>
              {role.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <p>Stack: {role.stack.join(', ')}</p>
          </article>
        ))}
      </section>

      <section>
        <h2>Projects</h2>
        {projects.map((p) => (
          <article key={p.id}>
            <h3>{p.name}</h3>
            <p>{p.tagline}</p>
            <p>{p.description}</p>
            <p>Stack: {p.stack.join(', ')}</p>
            <p>
              <a href={p.links.live}>Live site</a>{' '}
              <a href={p.links.github}>Source code</a>
            </p>
          </article>
        ))}
      </section>

      <section>
        <h2>Skills</h2>
        {skillGroups.map(([group, items]) => (
          <p key={group}>
            <strong>{group}:</strong> {items.join(', ')}
          </p>
        ))}
      </section>

      <section>
        <h2>Education</h2>
        {about.education.map((e) => (
          <p key={e.institution}>
            {e.degree} — {e.institution}, {e.location} ({e.period}), CGPA {e.cgpa}
          </p>
        ))}
      </section>

      <section>
        <h2>Certifications &amp; Achievements</h2>
        {about.certifications.map((c) => (
          <p key={c.title}>
            <strong>{c.title}:</strong> {c.detail}
          </p>
        ))}
        {about.achievements.map((a) => (
          <p key={a.title}>
            <strong>{a.title}:</strong> {a.detail}{' '}
            {a.stats.map((s) => `${s.label} ${s.value}`).join(' · ')}
          </p>
        ))}
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          <a href={about.links.email}>{about.links.email.replace('mailto:', '')}</a>
        </p>
        <p>
          <a href={about.links.github}>GitHub</a> ·{' '}
          <a href={about.links.linkedin}>LinkedIn</a> ·{' '}
          <a href={about.links.leetcode}>LeetCode</a> ·{' '}
          <a href={about.links.codechef}>CodeChef</a> ·{' '}
          <a href="/resume.pdf">Download resume (PDF)</a> ·{' '}
          <a href="/classic">Plain text version of this site</a>
        </p>
      </section>
    </div>
  )
}

export default function Home() {
  return (
    <>
      <PortfolioOS />
      <SemanticContent />
      <noscript>
        <div className="fixed inset-0 z-[9999] grid place-items-center bg-[#05060c] px-6 text-center text-white">
          <div>
            <h1 className="text-2xl font-semibold">{about.name}</h1>
            <p className="mt-1 text-white/70">{about.title}</p>
            <p className="mt-6 text-sm text-white/60">
              This portfolio runs as an interactive desktop and needs JavaScript.
            </p>
            <a
              href="/classic"
              className="mt-4 inline-block rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#0F766E]"
            >
              View the plain version
            </a>
          </div>
        </div>
      </noscript>
    </>
  )
}
