import React, { Component } from 'react';
import {Form, Table, Button, Message } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Course from '../ethereum/course';
import { Router } from '../routes';


class RequestRow extends Component {

    state = {
        loading: false,
        errorMessage: "",
        certLoading: false
    };

    currentDate = () => {
        //возвращает текущую дату в формате DD.MM.YYYY
        var dt = new Date();

        // Display the month, day, and year. getMonth() returns a 0-based number.
        var month = dt.getMonth()+1;
        if (month.toString().length == 1) {
            month = "0" + month.toString();
        }
        var day = dt.getDate();
        var year = dt.getFullYear();
        return (day + "." + month + "." + year);
    };

    
    onSubmit = async (event) => {
        console.log("onSubmit");
        console.log("Current date:", this.currentDate());
        event.preventDefault();
        
        this.setState({loading: true, errorMessage: ''});
        try {
            const accounts = await web3.eth.getAccounts();
            //console.log("RequestRow:", this.props.courseAddress);
            //console.log("stAddress:", this.props.address);
            const course = await Course(this.props.courseAddress);
            await course.methods
                .setStudentPassed(this.props.address, this.currentDate())
                .send({
                    from: accounts[0]
                });
        } catch (err) {
            this.setState({errorMessage: err.message });
        }
    
        this.setState({loading: false});
        Router.pushRoute(`/courses/${this.props.courseAddress}`);      
        
    };

    onSubmitCert = async (event) => {
        const { address, courseAddress } = this.props;
        this.setState({certLoading : true});

        //console.log("00", {courseAddress});
        //console.log("01", {address});
        Router.pushRoute(`/cert/${courseAddress}&address=${address}`);
    };
    
    onClickCert = (mylink) => {
       // Router.pushRoute(`/cert/${this.props.courseAddress}`);      

    };



    render() {
        const { Row, Cell } = Table;
        const { id, address, name, status, dateCert, courseAddress, courseName } = this.props;

        return (
                <Row>
                    <Cell>{id+1}</Cell>
                    <Cell>
                        {name}
                    </Cell>
                    <Cell>
                        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage} >
                        <Button loading={this.state.loading} disabled={status} fluid color="green" basic primary animated="vertical">
                            <Button.Content visible>
                                {address}
                            </Button.Content>
                            <Button.Content hidden>
                                Поставить зачет (только преподаватель!)
                            </Button.Content>
                        </Button>
                        <Message error header = "Ошибка!" content={this.state.errorMessage} />
                        </Form>
                    </Cell>
                    <Cell>
                        <Form onSubmit={this.onSubmitCert}>
                        {!status ? null : (
                                <Button loading={this.state.certLoading} fluid color="green" primary animated="vertical">
                                    <Button.Content visible>
                                        Сдан
                                    </Button.Content>
                                    <Button.Content hidden>
                                        Сертификат
                                    </Button.Content>
                                </Button>
                        )}
                        </Form>
                    </Cell>
                    <Cell>{dateCert}</Cell>
                </Row>

        );
    }
}
//<Link route={`/cert/${courseAddress}&address=${this.props.address}`}>                                    

export default RequestRow;