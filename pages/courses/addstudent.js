import React, { Component } from 'react';
import Layout from '../../components/Layout';
import Course from '../../ethereum/course';
import web3 from '../../ethereum/web3';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import { Router } from '../../routes';



class AddStudent extends Component {
    state = {
        studentName: '',
        errorMessage : '',
        loading: false
    };

    static async getInitialProps(props) {
        const course = await Course(props.query.address);
        const courseName = await course.methods.courseName().call();


        return {
            address: props.query.address,
            courseName: courseName,
        };
    }

    onSubmit = async (event) => {
        event.preventDefault();

        this.setState({loading: true, errorMessage: ''});

        try {
            if (this.state.studentName.length < 10) {
                throw new SyntaxError("Необходимо ввести Фамилию Имя студента! Не менее 10 символов.");
            }

            const accounts = await web3.eth.getAccounts();
            const course = Course(`${this.props.address}`);

            await course.methods.registerStudent(
                    this.state.studentName
                )
                .send({
                    from: accounts[0]
            }); 
            Router.pushRoute(`/courses/show?address=${this.props.address}`); 
        } catch (err) {
            this.setState({loading: false, errorMessage: err.message });
        }

        this.setState({loading: false});

    };

    render() {

        return(
            <Layout>
                <h3>Запись на курс: {this.props.courseName}</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage} >
                    <Form.Field>
                        <label>Фамилия Имя студента</label>
                        <Input 
                            value ={this.state.studentName}
                            onChange={event => 
                                this.setState({ studentName: event.target.value})}
                        />
                    </Form.Field>

                    <Message error header = "Ошибка!" content={this.state.errorMessage} />
                    <Button loading={this.state.loading} primary animated="vertical">
                        <Button.Content visible>
                            Записаться на курс!
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



export default AddStudent;