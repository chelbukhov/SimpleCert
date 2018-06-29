import React, { Component } from 'react';
import { Card, Grid, Button, Table } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Course from '../../ethereum/course';
import web3 from '../../ethereum/web3';
import { Link } from '../../routes';
import RequestRow from '../../components/RequestRow';
//import {withRouter} from 'next/router'
class CourseShow extends Component {


    static async getInitialProps(props) {
        const course = await Course(props.query.address);
    
        const manager = await course.methods.manager().call();
        const courseName = await course.methods.courseName().call();
        const courseLength = await course.methods.courseLength().call();
        const courseTeacher = await course.methods.teacherName().call();
        const studentsCount = await course.methods.getStudentsCount().call();

        const arrStudents = await Promise.all(
            Array(parseInt(studentsCount))
            .fill()
            .map((element, index) => {
                return course.methods.arrStudents(index).call()
            })
        );
        //console.log(arrStudents);
        
        const arrStudentsName = await Promise.all(
            Array(parseInt(studentsCount))
            .fill()
            .map((element, index) => {
                return course.methods.NameStudent(arrStudents[index]).call()
            })
        );

        const arrStudentsPassed = await Promise.all(
            Array(parseInt(studentsCount))
            .fill()
            .map((element, index) => {
                return course.methods.passedStudent(arrStudents[index]).call()
            })
        );

        const arrStudentsPassedDate = await Promise.all(
            Array(parseInt(studentsCount))
            .fill()
            .map((element, index) => {
                return course.methods.datePassedStudent(arrStudents[index]).call()
            })
        );

        let studentInfo = {
            studentName: String,
            studentAddress: String,
            studentPassed: Boolean,
            studentPassDate: String
        };


        let myArrInfo = new Array (studentInfo);
        myArrInfo.pop();

        for (let i = 0; i < arrStudents.length; i++){
            myArrInfo.push({
                studentName: arrStudentsName[i], 
                studentAddress: arrStudents[i], 
                studentPassed: arrStudentsPassed[i],
                studentPassDate: arrStudentsPassedDate[i]
            });
        }

        return {
            myArrInfo: myArrInfo,
            address: props.query.address,
            manager: manager,
            courseName: courseName,
            courseLength: courseLength,
            courseTeacher: courseTeacher
        };
    }


    renderRows(props) {
        
        //console.log(myArrInfo[1].studentName);
        return props.myArrInfo.map((request, index) => {
            //console.log("map:", props.address);
            return <RequestRow 
                key={index}
                id={index}
                name={request.studentName.substr(0,40)}
                address={request.studentAddress}
                status={request.studentPassed}
                dateCert={request.studentPassDate}
                courseAddress={props.address}
                courseName={props.courseName}
            />;
        });
    }


    render() {
        const { Header, Row, HeaderCell, Body } = Table;


        return (
            <Layout>
                    <Card fluid>
                        <Card.Content>
                            <Card.Header>
                            {this.props.courseName}
                            </Card.Header>
                            <Card.Meta>
                            Преподаватель: {this.props.courseTeacher}
                            </Card.Meta>
                            <Card.Description>
                            Продолжительность курса в ак. часах: {this.props.courseLength}
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <div>
                                <Link route={`/courses/addstudent?address=${this.props.address}`}>
                                        <Button fluid primary animated="vertical">
                                            <Button.Content visible>
                                                Хочу здесь учиться!
                                            </Button.Content>
                                            <Button.Content hidden>
                                                Запись на курс: {this.props.courseName} 
                                            </Button.Content>
                                        </Button>
                                </Link>
                            </div>
                        </Card.Content>
                    </Card>
                    <h3>Список студентов</h3>
                    <Table celled>
                        <Header>
                            <Row>
                                <HeaderCell>№</HeaderCell>
                                <HeaderCell>ФИО</HeaderCell>
                                <HeaderCell>Адрес</HeaderCell>
                                <HeaderCell>Статус</HeaderCell>
                                <HeaderCell>Дата сдачи</HeaderCell>
                            </Row>
                        </Header>
                        <Body>{this.renderRows(this.props)}</Body>
                    </Table>
            </Layout>
        );
    }
}

export default CourseShow;