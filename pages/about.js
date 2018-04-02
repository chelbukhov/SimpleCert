import React, { Component } from 'react';
import Layout from '../components/Layout';
import { Container, Header, Message, Divider } from 'semantic-ui-react'

class CertAbout extends Component {

    render() {
        return(
            <Layout>
                  <Message>
                    <Message.Header>О проекте</Message.Header>
                    <Message content="Этот проект предназначен для изучения возможности динамического формирования документов, в частности - сертификатов слушателей, подтверждающих прохождение учебных курсов и хранения всей необходимой информации на блокчейне Ethereum." />
                    <Message content="Для тестирования необходимо использовать браузер 'Chrome' с установленным расширением 'MetaMask'. Данное расширение необходимо настроить на тестовую сеть 'Rinkeby' и иметь некоторое количество эфира на учетной записи." />
                    <Message content="Может применяться в учебных заведениях для подтверждения подлинности выданных документов." />
                    <Message content="Внимание! Все действия, связанные с изменением данных на блокчейне, а именно:" />
                    <Message.List>
                    <Message.Item>Создание нового учебного курса;</Message.Item>
                    <Message.Item>Добавление студента;</Message.Item>
                    <Message.Item>Отметка о сдаче курса (Поставить зачет).</Message.Item>
                    </Message.List>
                    <Message content="создают транзакции в тестовой сети Ethereum. Таким образом, эти действия требуют определенного времени для выполнения. Примерно 15-20 секунд." />
                </Message>
                <Container fluid>
                <Divider></Divider>
    
                    <p>Язык смарт-контракта: Solidity</p>
                    <p>Сайт написан с использованием:
                        <li>React.js</li>
                        <li>Semantic-react-ui</li>
                    </p>
                    <p>Тестирование:
                        <li>ganache-cli</li>
                        <li>mocha</li>
                    </p>
                    <p>IDE:
                        <li>Remix Solidity IDE</li>
                        <li>VS Code</li>
                    </p>
                    
                    <p><a href="mailto:alex_sysadm@rambler.ru">отправить сообщение разработчику...</a></p>
                </Container>
            </Layout>
        );
    }
}

export default CertAbout;