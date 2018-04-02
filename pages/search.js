import React, { Component } from 'react';
import Layout from '../components/Layout';
import { Form, Table, Button, Input, Message } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Course from '../ethereum/course';
import { Link } from '../routes';


class Search extends Component {

    state = {
        stAddres: '',
        errorMessage : '',
        loading: false,
        myArr: Array
    };


    
    onSubmit = async (event) => {
        event.preventDefault();

        this.setState({loading: true, errorMessage: ''});

        const courses = await factory.methods.getDeployedCourses().call();


        let studentCourse = {
            coursAddress: String,
            courseName: String,
            courseTeacher: String,
            courseLength: String,
            studentFIO: String,
            studentPassed: Boolean,
            stDatePassed: String
        }

        let myCourseArr = new Array(studentCourse);
        myCourseArr.pop();



        try {
            //console.log("Search: ", this.state.stAddres);
   
            
            for (let i = 0; i < courses.length; i++){
                const CN = await factory.methods.mapDeployedCourses(courses[i]).call();
                const course = Course(courses[i]);
                const isStudent = await course.methods.isStudent(this.state.stAddres).call();
                if (isStudent) {
                    const stFIO = await course.methods.NameStudent(this.state.stAddres).call();
                    let isPassStudent = false;
                    isPassStudent = await course.methods.passedStudent(this.state.stAddres).call();
                    
                    let datePass = '';
                    if (isPassStudent) {
                        datePass =  await course.methods.datePassedStudent(this.state.stAddres).call();
                        //console.log("datePass:", datePass);
                        
                    }



                    
                    myCourseArr.push({
                        courseAddress: courses[i],
                        courseName : CN.courseName,
                        courseLength : CN.courseLength,
                        courseTeacher : CN.courseTeacher,
                        studentFIO : stFIO,
                        studentPassed : isPassStudent,
                        stDatePassed : datePass
                    });
                            
                }
    
            }
    
            this.setState({loading: false});
            this.setState({myArr : myCourseArr});
            //console.log("onSubmit:", myCourseArr);
            return { myCourseArr };
    


            
        } catch (err) {
            this.setState({errorMessage: err.message });
        }
        this.setState({loading: false});
    }

    renderSearch() {
        const { Row, Cell } = Table;
        const data = this.state.myArr;
        //console.log("arrData:", data);
        try {
            return data.map((request, index) => {
                //console.log("item[i]: ", request.courseName);
                return(

                    <Row key={index}>
                        <Cell>{request.courseName}</Cell>
                        <Cell>{request.studentFIO}</Cell>
                        <Cell>
                            {!request.studentPassed ? null : (
                                <Link route={`/cert/${request.courseAddress}&address=${this.state.stAddres}`}>                                    
                                    <Button fluid color="blue" primary animated="vertical">
                                        <Button.Content visible>
                                            Сдан
                                        </Button.Content>
                                        <Button.Content hidden>
                                            Сертификат
                                        </Button.Content>
                                    </Button>
                                </Link>                        
                            )}
                        </Cell>
                        <Cell>{request.stDatePassed}</Cell>
                
                    </Row>
                );
            });
            
        } catch (error) {
            
        }
    }


    render() {
        const { Header, Row, HeaderCell, Body } = Table;

        return(
            <Layout>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage} >
                    <Form.Field>
                        <label>Введите адрес - account в сети Ethereum для поиска</label>
                        <Input 
                            value ={this.state.stAddres}
                            onChange={event => 
                                this.setState({ stAddres: event.target.value})}
                        />
                    </Form.Field>

                    <Button loading={this.state.loading} primary >
                        <Button.Content>
                            Поиск!
                        </Button.Content>
                    </Button>

                    <Message error header = "Ошибка!" content={this.state.errorMessage} />
                </Form>
                <Table celled>
                        <Header>
                            <Row>
                                <HeaderCell>Курс</HeaderCell>
                                <HeaderCell>ФИО</HeaderCell>
                                <HeaderCell>Статус</HeaderCell>
                                <HeaderCell>Дата сдачи</HeaderCell>
                            </Row>
                        </Header>
                        <Body>{this.renderSearch()}</Body>
                    </Table>
            </Layout>
        );
    };
}

export default Search;