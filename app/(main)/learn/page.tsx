import { redirect } from 'next/navigation'
import { getUserProgress } from '@/db/queries'
import { FeedWrapper } from '@/components/feed-wrapper'
import { StickyWrapper } from '@/components/sticky-wrapper'
import { Header } from './header'
import { UserProgress } from '@/components/user-progress'

export default async function LearnPage() {
  const userProgressData = getUserProgress()
  const [userProgress] = await Promise.all([userProgressData])

  if (!userProgress || !userProgress.activeCourse) {
    redirect('/courses')
  }

  return (
    <div className='flex flex-row-reverse gap-[48px] px-6'>
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={false}
        />
      </StickyWrapper>
      <FeedWrapper>
        <Header title={userProgress.activeCourse.title} />
      </FeedWrapper>
    </div>
  )
}
