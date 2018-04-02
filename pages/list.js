import React, { Component } from 'react';
import Layout from '../components/Layout';
import { Container, Header } from 'semantic-ui-react'

class CertList extends Component {

    render() {
        return(
            <Layout>
                <Container fluid>
                    <Header as='h2'>Список участников</Header>
                    <p>=Список=</p>
                </Container>
            </Layout>
        );
    }
}

export default CertList;