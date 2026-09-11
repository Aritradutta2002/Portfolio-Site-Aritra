import about from '@/content/about.json'
import experience from '@/content/experience.json'
import projects from '@/content/projects.json'
import type { AppType } from '@/store/windowStore'

export type Tone = 'out' | 'err' | 'accent' | 'dim' | 'head'

export interface TermLine {
  text: string
  tone?: Tone
}

export interface TermApi {
  openApp: (appType: AppType, payload?: string) => void
  clear: () => void
}

export interface TermResult {
  lines: TermLine[]
}

const TO_EMAIL = about.links.email.replace('mailto:', '')

const out = (text: string, tone: Tone = 'out'): TermLine => ({ text, tone })

const skillGroups = Object.entries(about.skills) as Array<[string, string[]]>

export function banner(): TermLine[] {
  return [
    out(`Last login: ${new Date().toUTCString()}`, 'dim'),
    out(''),
    out(`  ${about.name} — ${about.title}`, 'accent'),
    out(`  ${about.company} · ${about.location}`, 'dim'),
    out(''),
    out('  Type `help` to see what this shell knows.'),
    out(''),
  ]
}

export function runCommand(raw: string, api: TermApi): TermResult {
  const input = raw.trim()
  if (!input) return { lines: [] }

  const [cmd, ...rest] = input.split(/\s+/)
  const arg = rest.join(' ')
  const c = cmd.toLowerCase()

  switch (c) {
    case 'help':
    case '?':
      return {
        lines: [
          out('Available commands', 'head'),
          out('  whoami            who this machine belongs to'),
          out('  cat about.txt     short bio'),
          out('  ls skills         list skill categories'),
          out('  ls skills <cat>   list skills in a category'),
          out('  ls projects       list projects'),
          out('  cd <project>      open a project window'),
          out('  exp               career history'),
          out('  social            links to profiles'),
          out('  open resume       open the Resume app'),
          out('  date              current date and time'),
          out('  clear             clear the screen'),
          out('  echo <text>      print text back'),
        ],
      }

    case 'whoami':
      return {
        lines: [
          out(about.name, 'accent'),
          out(about.title),
          out(`${about.company} · ${about.location}`, 'dim'),
        ],
      }

    case 'cat': {
      if (arg.replace(/\.txt$/, '').toLowerCase() === 'about') {
        return { lines: [out(about.bio)] }
      }
      return { lines: [out(`cat: ${arg || '(no file)'}: No such file or directory`, 'err')] }
    }

    case 'ls': {
      if (arg === 'skills') {
        return {
          lines: [
            ...skillGroups.map(([g, items]) => out(`  ${g.padEnd(22)} ${items.length} item(s)`)),
            out(''),
            out('  hint: ls skills "Tools & Platforms"', 'dim'),
          ],
        }
      }
      if (arg.startsWith('skills ')) {
        const want = arg.slice(7).replace(/^["']|["']$/g, '').toLowerCase()
        const match = skillGroups.find(([g]) => g.toLowerCase() === want)
        if (!match) return { lines: [out(`ls: unknown category "${want}"`, 'err')] }
        return { lines: [out(`${match[0]}:`, 'head'), out('  ' + match[1].join(', '))] }
      }
      if (arg === 'projects') {
        return {
          lines: [
            out('  NAME        TAGLINE'),
            ...projects.map((p) => out(`  ${p.name.padEnd(11)} ${p.tagline}`)),
            out(''),
            out('  hint: cd ' + (projects[0]?.id ?? ''), 'dim'),
          ],
        }
      }
      if (!arg) {
        return {
          lines: [out('about.txt    projects/    skills/    resume.pdf', 'out')],
        }
      }
      return { lines: [out(`ls: ${arg}: No such file or directory`, 'err')] }
    }

    case 'cd': {
      const want = arg.toLowerCase()
      const p = projects.find((x) => x.id === want || x.name.toLowerCase() === want)
      if (!p) return { lines: [out(`cd: no such project: ${arg}`, 'err')] }
      api.openApp('project', p.id)
      return { lines: [out(`Opening ${p.name}…`, 'accent')] }
    }

    case 'open': {
      const target = arg.toLowerCase()
      if (target === 'resume' || target === 'resume.pdf') {
        api.openApp('resume')
        return { lines: [out('Opening Resume…', 'accent')] }
      }
      if (target === 'about') {
        api.openApp('about')
        return { lines: [out('Opening About…', 'accent')] }
      }
      if (target === 'contact') {
        api.openApp('contact')
        return { lines: [out('Opening Contact…', 'accent')] }
      }
      if (target === 'experience' || target === 'exp') {
        api.openApp('experience')
        return { lines: [out('Opening Experience…', 'accent')] }
      }
      return { lines: [out(`open: cannot open "${arg}"`, 'err')] }
    }

    case 'exp':
    case 'experience':
      return {
        lines: [
          out('Experience', 'head'),
          ...experience.flatMap((e) => [
            out(`  ${e.role} — ${e.org}`),
            out(`  ${e.period} · ${e.location}`, 'dim'),
            ...e.highlights.map((h) => out(`    · ${h}`, 'accent')),
            out(''),
          ]),
        ],
      }

    case 'social':
      return {
        lines: [
          out('Profiles', 'head'),
          out(`  GitHub    ${about.links.github}`),
          out(`  LinkedIn  ${about.links.linkedin}`),
          out(`  LeetCode  ${about.links.leetcode}`),
          out(`  CodeChef  ${about.links.codechef}`),
          out(`  Email     ${TO_EMAIL}`),
        ],
      }

    case 'date':
      return { lines: [out(new Date().toString())] }

    case 'echo':
      return { lines: [out(arg)] }

    case 'clear':
      api.clear()
      return { lines: [] }

    case 'sudo':
      return {
        lines: [out('Nice try. This Mac has exactly one user and it is not root.', 'err')],
      }

    case 'exit':
    case 'logout':
      return { lines: [out('There is no exit — close the window with ⌘W.', 'dim')] }

    default:
      return {
        lines: [out(`zsh: command not found: ${cmd}`, 'err'), out('Type `help` for a list of commands.', 'dim')],
      }
  }
}

export const COMPLETIONS = [
  'help',
  'whoami',
  'cat about.txt',
  'ls skills',
  'ls projects',
  'cd ',
  'open resume',
  'exp',
  'social',
  'date',
  'echo ',
  'clear',
  'sudo ',
]
