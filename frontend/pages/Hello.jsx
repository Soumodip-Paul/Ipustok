import Head from 'next/head'
import React from 'react'
import styles from '../styles/Home.module.css'

const Hello = () => {
    return (
        <main className={styles.main}>
            <Head>
                <title>Hello</title>
                <meta name="description" content="Ipustok - A note taking app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            Hello
        </main>
    )
}

export default Hello