import React from 'react';
import { Container } from 'semantic-ui-react';
import Head from 'next/head';
import CertHeader from '../components/header';
import CertFooter from '../components/footer';


export default (props) => {
    return (
        <Container>
            <Head>
                <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css" />
            </Head>
                <CertHeader />
                    {props.children}
                <CertFooter />
        </Container>
    );
};


