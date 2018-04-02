const assert = require ('assert');              // утверждения
const ganache = require ('ganache-cli');        // тестовая сеть
const Web3 = require ('web3');                  // библиотека для подключения к ефириуму
const web3 = new Web3(ganache.provider());      // настройка провайдера

const compiledFactory = require('../ethereum/build/CourseFactory.json');
const compiledContract = require('../ethereum/build/SimpleCert.json');

let accounts;
let factory;
let contractAddress;

console.log ('Begin testing...');


beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
//    console.log(accounts);
//    console.log(await web3.eth.getBalance(accounts[0]));
        // получаем контракт из скомпилированного ранее файла .json
    // разворачиваем его в тестовой сети и отправляем транзакцию
    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: compiledFactory.bytecode })
        .send({ from: accounts[0], gas: '6000000'});

    contract = await factory.methods.createContract(accounts[1], "NewCourseName", 100, "Chelbukhov").send({
        from: accounts[1],
        gas: '1000000'
        
    });
    
    const addresses = await factory.methods.getDeployedCourses().call();
    courseAddress = addresses[0];

    //получаем развернутый ранее контракт по указанному адресу
    myCourse = await new web3.eth.Contract(
        JSON.parse(compiledContract.interface),
        courseAddress
    );


});

describe('Testing factory...', () => {
    it('Deploy factory', () => {
        assert.ok(factory.options.address);
    });

    it('deploy a contract', () => {
        assert.ok(contract);
    });

    it('get address of new contract', () => {
        assert(courseAddress);
        console.log(courseAddress);
    });

    it('get new contract info', async () => {
        const newCourse = await factory.methods.mapDeployedCourses(courseAddress).call();
        assert.equal(newCourse.courseName, "NewCourseName");
        assert.equal(newCourse.courseLength, 100);
        assert.equal(newCourse.courseTeacher, "Chelbukhov");
    });



});

describe('Testing a contract...', () => {

    it('Test a Course owner', async () => {
        const cOwner = await myCourse.methods.owner().call();
        assert.equal(accounts[0], cOwner);
//        console.log("account0:", accounts[0]);
//        console.log("account1:", accounts[1]);
        
    });

    it('Test a Course manager', async () => {
        const cManager = await myCourse.methods.manager().call();
        assert.equal(accounts[1], cManager);
//        console.log("manager:", accounts[1]);
    });

    it('Test a CourseName', async () => {
        const cName = await myCourse.methods.courseName().call();
        assert.equal(cName, "NewCourseName");
    });

    it('Test a CourseLength', async () => {
        const cLength = await myCourse.methods.courseLength().call();
        assert.ok(cLength == 100);
    });

    it('Test a CourseTeacher', async () => {
        const cTech = await myCourse.methods.teacherName().call();
        assert.ok(cTech == "Chelbukhov");
    });

    it('Test a registration two students', async () => {

        const stCount0 = await myCourse.methods.getStudentsCount().call();
        console.log("empty array of student", stCount0)

        await myCourse.methods.registerStudent("Ivanov Petr").send({
            from: accounts[3],
            gas: "1000000"
        });
        const isSt = await myCourse.methods.isStudent(accounts[3]).call();
        assert(isSt);

        const stName = await myCourse.methods.NameStudent(accounts[3]).call();
        assert.equal(stName, "Ivanov Petr");

        const stPassed = await myCourse.methods.passedStudent(accounts[3]).call();
        assert.ok(!stPassed);

        const datePassed = await myCourse.methods.datePassedStudent(accounts[3]).call();
        assert.equal(datePassed, "");
        
        const arrSt = await myCourse.methods.arrStudents(0).call();
        assert.equal(arrSt, accounts[3]);

        const stCount1 = await myCourse.methods.getStudentsCount().call();
        
        console.log("after first registration:", stCount1);

        await myCourse.methods.registerStudent("Sidorov Michail").send({
            from: accounts[4],
            gas: "1000000"
        });
        const isSt1 = await myCourse.methods.isStudent(accounts[4]).call();
        assert(isSt1);

        const stName1 = await myCourse.methods.NameStudent(accounts[4]).call();
        assert.equal(stName1, "Sidorov Michail");

        const stPassed1 = await myCourse.methods.passedStudent(accounts[4]).call();
        assert.ok(!stPassed1);

        const datePassed1 = await myCourse.methods.datePassedStudent(accounts[4]).call();
        assert.equal(datePassed1, "");
        
        const arrSt1 = await myCourse.methods.arrStudents(1).call();
        assert.equal(arrSt1, accounts[4]);

        const stCount2 = await myCourse.methods.getStudentsCount().call();
        
        console.log("after second registration:", stCount2);


        console.log("...test passing course for account[3]...")

        await myCourse.methods.setStudentPassed(accounts[3], "20.03.2018").send({
            from: accounts[0],
            gas: "1000000"
        });
        const datePassed2 = await myCourse.methods.datePassedStudent(accounts[3]).call();
        assert.equal(datePassed2, "20.03.2018");
        console.log("Passed date is:", datePassed2);

        const stPassed2 = await myCourse.methods.passedStudent(accounts[3]).call();
        assert.ok(stPassed2);


        const datePassed3 = await myCourse.methods.datePassedStudent(accounts[4]).call();
        assert.equal(datePassed3, "");

        
    });



    
});

