import React from 'react';
import Head from 'next/head';

const Meta = ({title , keywords , description }) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />

            <link rel="icon" href="/cricfinal.jpg" />

        </Head>
    )
}

Meta.defaultProps = {
    title: ' CRIC DAO ' ,
    description: 'For the cricket fans out there' ,
    keywords: 'Cricket , DAO , NFT ' ,
}

export default Meta