import web3 from './web3';
import Course from './build/SimpleCert.json';

export default (address) => {
    return new web3.eth.Contract(JSON.parse(Course.interface), address);
};