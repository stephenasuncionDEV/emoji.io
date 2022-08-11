import { FC } from 'react'
import Head from 'next/head'
import { MetaProps } from '@/types/global'

const Meta: FC<MetaProps> = ({ title }) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name="title" content='NFT Host' />
            <meta name="description" content='NFT Host is a website where you can generate NFT collections and create NFT minting website. We provide the fastest and cheapest NFT generator in the market. Mint website features includes prebuilt templates, addons, domain, and more. We also offer utils for your metadata files that includes metadata key updates.' />
            <meta name="keywords" content='NFT Host, Host NFT, Mint Website, Mint NFT Website Hosting, Mint NFT, NFT, Mint, Crypto Currency, Crypto, Ethereum' />
            <meta name="robots" content='index, follow' />
            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="language" content='en' />
            <meta name="theme-color" content="#348CD4" />
            
            <meta property="og:type" content='website' />
            <meta property="og:url" content='https://www.nfthost.app/' />
            <meta property="og:title" content='NFT Host - Generate &#38; Host your NFT Collection' />
            <meta property="og:description" content='NFT Host is a website where you can generate NFT collections and create NFT minting website. We provide the fastest and cheapest NFT generator in the market. Mint website features includes prebuilt templates, addons, domain, and more. We also offer utils for your metadata files that includes metadata key updates.' />
            <meta property="og:image" content='https://www.nfthost.app/assets/logo.png' />
            <meta property="og:site_name" content='NFT Host' />

            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content='https://www.nfthost.app/' />
            <meta property="twitter:title" content='NFT Host - Generate &#38; Host your NFT Collection' />
            <meta property="twitter:description" content='NFT Host is a website where you can generate NFT collections and create NFT minting website. We provide the fastest and cheapest NFT generator in the market. Mint website features includes prebuilt templates, addons, domain, and more. We also offer utils for your metadata files that includes metadata key updates.' />
            <meta property="twitter:image" content='https://www.nfthost.app/assets/logo.png' />
        </Head>
    )
}

export default Meta