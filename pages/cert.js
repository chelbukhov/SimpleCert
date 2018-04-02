import React, { Component } from 'react';
import Layout from '../components/Layout';
import { Grid, Message, Card, Icon } from 'semantic-ui-react';
import { Router, Link } from '../routes';
import Course from '../ethereum/course';


class GetCert extends Component {
    //state = {
    //    stAddres: String,
    //    errorMessage: ""
    //}   

    static async getInitialProps(props) {
        try {
            const fullAddress = props.query.address;
            const courseAddressPosition = fullAddress.indexOf("&address=");
            const courseAddress = fullAddress.substr(0,courseAddressPosition);
            const stAddressPosition = courseAddressPosition + 9;
            const stAddress = fullAddress.substr(stAddressPosition);
            //console.log("courseAddress: ",courseAddress);
            //console.log("stAddress: " ,stAddress);
                const course = Course(courseAddress);
    
                const courseName = await course.methods.courseName().call();
                const courseLength = await course.methods.courseLength().call();
                const teacherName = await course.methods.teacherName().call();
                const isStudent = await course.methods.isStudent(stAddress).call();
    
    
    
                const isPassedStudent = await course.methods.passedStudent(stAddress).call();
                const nameStudent = await course.methods.NameStudent(stAddress).call();
                const DatePassed = await course.methods.datePassedStudent(stAddress).call();
                //console.log("Студент: ", nameStudent);
                
    
                return {            
                    isErr : false,
                    courseAddress: courseAddress,
                    courseName: courseName,
                    courseLength: courseLength,
                    teacherName: teacherName,
                    nameStudent: nameStudent,
                    DatePassed: DatePassed,
                    isStudent: isStudent
    
                };
                
        } catch (err) {
            return {
                isErr : true,
                errorMessage : err.message
            }
        }
    
    }



    render() {
        const { isErr, errorMessage, nameStudent, courseAddress, courseName, courseLength, teacherName, DatePassed, isStudent } = this.props;

        //console.log("error:", {isErr});
        return(
            <Layout>

                    {isStudent ?(
                        <Grid >
                            <Grid.Column width={8}>                        
                                <Message floating>
                                    <Message.Header>{`Курс: ${courseName}`}</Message.Header>
                                    <Message.Content>{`Преподаватель: ${teacherName}`}</Message.Content>
                                    <Message.Content>{`Кол-во учебных часов: ${courseLength}`}</Message.Content>
                                    <Message.Content>{`Студент: ${nameStudent}`}</Message.Content>
                                    <Message.Content>{`Дата сдачи курса: ${DatePassed}`}</Message.Content>
                                </Message>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                    <Message positive floating>
                                        <Message.Header>Сертификат</Message.Header>
                                        <Message.Content>В реальной системе здесь будет Ваш сертификат!</Message.Content>
                                        <div>
                                            <Icon.Group size='large'>
                                            <Icon loading size='big' name='sun' />
                                            <Icon name='user' />
                                            </Icon.Group>
                                        </div>
                                    </Message>
                            </Grid.Column>
                        </Grid>

                    ) : (

                    <Message>
                        <Message.Header>{`Нет информации`}</Message.Header>
                    </Message>
       
                    )}

                    {!isErr ? null : (
                        <Message error header = "Ошибка!" content={errorMessage} />
                    )}

            </Layout>
        );
    };
}

export default GetCert;




