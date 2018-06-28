import React, { Component } from 'react';
import { Grid, Card, Button } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import { Link } from '../routes';
//import course from '../ethereum/course';

class CertIndex extends Component {



    static async getInitialProps() {
        const courses = await factory.methods.getDeployedCourses().call();
//        const courseStruct = await factory.methods.mapDeployedCourses({courses}[0]).call();
//        console.log(courses);
        let Course = {
            coursAddress: String,
            courseName: String,
            courseTeacher: String,
            courseLength: String
        }

        let myCourseArr = new Array(Course);
        myCourseArr.pop();
//        console.log(courseStruct);
//        const items = courses.map(address => {
//            console.log(courses);
    
//        });

        for (let i = 0; i < courses.length; i++){
            const CN = await factory.methods.mapDeployedCourses(courses[i]).call();
            myCourseArr.push({
            coursAddress: courses[i],
            courseName : CN.courseName,
            courseLength : CN.courseLength,
            courseTeacher : CN.courseTeacher,
            });
        }
        //console.log(myCourseArr);


        return { myCourseArr }
    
    }



    renderCourses(props) {
//        const items = this.props.courses.map(address => {
        const items = props.myCourseArr.map((request, index) => {

            return {

                color: "blue",
                href: `/courses/${request.coursAddress}`,
                header:  request.courseName,
                meta: "учебных часов: " + request.courseLength,
                description: "Преподаватель: " + request.courseTeacher,
                fluid: true 
 
            };
        });
        return <Card.Group items={items} />;

    }

    render() {
        return(
            <Layout>
                <Grid>
                    <Grid.Column width={8}>                        
                        <h3>Список курсов</h3>
                    </Grid.Column>                        
                    <Grid.Column width={8}>                        
                        <Link route="/courses/new">
                            <a>
                                <Button 
                                    floated="right" 
                                    content="Создать курс" 
                                    icon="add circle" 
                                    primary 
                                    />
                            </a>
                        </Link>
                    </Grid.Column>                        
                </Grid>    
                    {this.renderCourses(this.props)}
            </Layout>
        );
    }
}

export default CertIndex;