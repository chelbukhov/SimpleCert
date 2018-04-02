import React, { Component } from 'react';
import { Card, Divider } from 'semantic-ui-react'




class CertFooter extends Component {

    render() {
        return (
            <div>
            <Divider></Divider>
            <Card fluid color='grey'>
                <Card.Content>
                    <Card.Header>
                    ...связаться с разработчиком...
                    </Card.Header>
                    <Card.Meta>
                    +7 (926) 179-63-00
                    </Card.Meta>
                    <Card.Description>
                    Смарт-контракт работает в тестовой сети Rinkeby блокчейна Ethereum и предназначен для тестирования.
                    </Card.Description>
                </Card.Content>
            </Card>

            </div>
        );
    }
}

export default CertFooter;