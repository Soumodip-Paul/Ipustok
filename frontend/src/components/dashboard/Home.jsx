import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Features from '../../components/items/Features'

const Home = () => {
  return (
    <main className="text-gray-600 body-font container px-5 py-8 mx-auto">
      <Head>
        <title>Ipustok</title>
        <meta name="description" content="Ipustok - A note taking app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto flex px-5 py-4 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Before they sold out
            <br className="hidden lg:inline-block" />readymade gluten
          </h1>
          <p className="mb-8 leading-relaxed">Copper mug try-hard pitchfork pour-over freegan heirloom neutra air plant cold-pressed tacos poke beard tote bag. Heirloom echo park mlkshk tote bag selvage hot chicken authentic tumeric truffaut hexagon try-hard chambray.</p>
          <div className="flex justify-center">
            <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button>
            <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Button</button>
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <Image width={720} height={600} className="object-cover object-center rounded" alt="hero" src="https://dummyimage.com/720x600" />
        </div>
      </div>
      <Features className={'py-6'} />

      <div className="flex flex-col sm:flex-row sm:items-center items-start mx-auto my-8 bg-indigo-100 py-6 px-6 rounded-md">
        <h1 className="flex-grow sm:pr-16 text-md font-normal text-gray-900">Slow-carb next level shoindxgoitch ethical authentic, scenester sriracha forage.</h1>
        <button className="flex-shrink-0 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-10 sm:mt-0">Button</button>
      </div>
    </main>
  )
}

export default Home