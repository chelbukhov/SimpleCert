import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class CourseNew extends Component {
    state = {
        courseName: '',
        courseLength: '',
        courseTeacher: '',
        errorMessage : '',
        loading: false
    };

    onSubmit = async (event) => {
        event.preventDefault();

        this.setState({loading: true, errorMessage: ''});
        try {
                if (this.state.courseName.length < 10) {
                    throw new SyntaxError("Необходимо ввести наименование курса! Не менее 10 символов.");
                }

                if (this.state.courseLength == 0) {
                    throw new SyntaxError("Необходимо ввести длительность курса! Это количество часов.");
                }

                if (this.state.courseTeacher.length < 5) {
                    throw new SyntaxError("Необходимо ввести Фамилию И.О. преподавателя! Не менее 5 символов.");
                }

            const accounts = await web3.eth.getAccounts();
            await factory.methods
                .createContract(
                    accounts[0],
                    this.state.courseName,
                    this.state.courseLength,
                    this.state.courseTeacher
                )
                .send({
                    from: accounts[0]
            }); 
            Router.pushRoute('/');         // переход на корневую страницу
        } catch (err) {
            this.setState({errorMessage: err.message });
        }

        this.setState({loading: false});

    };

    render() {
        return (
            <Layout>
                <h3>Создание нового курса</h3>

                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage} >
                    <Form.Field>
                        <label>Наименование курса</label>
                        <Input 
                            value ={this.state.courseName}
                            onChange={event => 
                                this.setState({ courseName: event.target.value})}
                        />
                        <label>Продолжительность курса</label>
                        <Input 
                            label='учебных часов' 
                            labelPosition='right'
                            value ={this.state.courseLength}
                            onChange={event => 
                                this.setState({ courseLength: event.target.value})}
                        />
                        <label>Преподаватель курса</label>
                        <Input 
                            label='Фамилия И.О.' 
                            labelPosition='right'
                            value ={this.state.courseTeacher}
                            onChange={event => 
                                this.setState({ courseTeacher: event.target.value})}
                        />
                        
                    </Form.Field>

                    <Message error header = "Ошибка!" content={this.state.errorMessage} />
                    <Button loading={this.state.loading} primary animated="vertical">
                        <Button.Content visible>
                            Создать новый курс!
                        </Button.Content>
                        <Button.Content hidden>
                        ..взимается плата..
                        </Button.Content>
                    </Button>
                </Form>
            </Layout>
        );
    }
}

export default CourseNew;