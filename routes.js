const routes = require('next-routes')();

routes
    .add('/courses/new', 'courses/new')
    .add('/courses/:address', '/courses/show')
    .add('/courses/:address/addstudent', '/courses/addstudent')
    .add('/cert/:address', '/cert');


module.exports = routes;