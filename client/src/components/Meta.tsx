import { FC } from 'react'
import Head from 'next/head'
import { MetaProps } from '@/types/global'

const Meta: FC<MetaProps> = ({ title }) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name="title" content='emoji.io' />
            <meta name="description" content='Hangout and interact with other people while having the ability to customize your player.' />
            <meta name="keywords" content='emoji.io' />
            <meta name="robots" content='index, follow' />
            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="language" content='en' />
            <meta name="theme-color" content="#348CD4" />
            
            <meta property="og:type" content='website' />
            <meta property="og:url" content='https://emoji-io.netlify.app/' />
            <meta property="og:title" content='emoji.io - Hangout and Interact with Other People' />
            <meta property="og:description" content='Hangout and interact with other people while having the ability to customize your player.' />
            <meta property="og:image" content='https://emoji-io.netlify.app/assets/images/logo.png' />
            <meta property="og:site_name" content='emoji.io' />

            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content='https://emoji-io.netlify.app/' />
            <meta property="twitter:title" content='emoji.io - Hangout and Interact with Other People' />
            <meta property="twitter:description" content='Hangout and interact with other people while having the ability to customize your player.' />
            <meta property="twitter:image" content='https://emoji-io.netlify.app/assets/images/logo.png' />
        </Head>
    )
}

export default Meta