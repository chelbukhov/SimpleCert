import web3 from './web3';
import CourseFactory from './build/CourseFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CourseFactory.interface),
    '0x0795659a33Dc016CdF459854173e1caaaDDE74B0'
);

export default instance;