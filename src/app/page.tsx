'use client'

import Steps from './_components/Steps'
import Hero from './_components/Hero'
import Features from './_components/Features'
import ConvinceYou from './_components/ConvinceYou'
import { ExperiencesCards } from './_components/ExperiencesCards'
import { FAQ } from './_components/FAQ'
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    return () => {}
  }, [])
  return (
    <div className='max-h-full m-auto flex flex-col'>
      <p>Landig</p>
      {/* <Hero />
      <Steps />
      <Features />
      <ConvinceYou />
      <ExperiencesCards />
      <FAQ /> */}
    </div>
  )
}
