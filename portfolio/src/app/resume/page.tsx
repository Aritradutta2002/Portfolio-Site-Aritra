import type { Metadata } from 'next'
import { resumeData } from '@/data/resumeData'
import ResumeClient from './ResumeClient'

export const metadata: Metadata = {
  title: `${resumeData.name} — Resume`,
  description: resumeData.summary.slice(0, 160),
}

export default function ResumePage() {
  return <ResumeClient />
}
