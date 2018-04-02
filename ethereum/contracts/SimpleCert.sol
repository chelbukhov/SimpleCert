pragma solidity ^0.4.17;

contract CourseFactory {
    // Контракт для развертывания дочерних контрактов курсов
    // Chelbukhov A.A.


 
 
    struct Course {
        string courseName;      // наименование курса
        uint courseLength;      // продолжительность курса в учебных часах
        string courseTeacher;   // преподаватель курса
    }
 
    address[] public deployedCoursesAddresses;
//    Course[] public deployedCourses;
    address public owner;

    mapping (address => Course) public mapDeployedCourses;


    modifier restricted() {
        require(msg.sender == owner);
        _;
    }   
    
    function CourseFactory () public {
        owner = msg.sender;
    }
    
    function createContract(address manager, string courseName, uint courseLength, string courseTeacher) public {
        address newContract = new SimpleCert(manager, owner, courseName, courseLength, courseTeacher);
        Course memory tempCourse = Course({
            courseName : courseName,
            courseLength : courseLength,
            courseTeacher : courseTeacher
        }); 
                                                    
        mapDeployedCourses[newContract] = tempCourse;
        deployedCoursesAddresses.push(newContract);

    }

    
    function getDeployedCoursesLength() public view returns(uint) {
        return deployedCoursesAddresses.length;
    }

    function getDeployedCourses() public view returns(address[]) {
        return deployedCoursesAddresses;
    }

    function killContract() public restricted {
        selfdestruct(owner);
    }
    
}



contract SimpleCert {
    // Система учета курсов и сертификатов
    // Chelbukhov A.A.
    
    address public manager;
    address public owner;
    string public courseName;
    uint public courseLength;
    string public teacherName;
    
    
    // Регистрация студентов
    mapping (address => bool) public isStudent;         //студент зарегистрировался на курс
    mapping (address => string) public NameStudent;     //ФИО студента
    mapping (address => bool) public passedStudent;     //студент сдал курс (может печатать сертификат)
    mapping (address => string) public datePassedStudent; //дата сдачи
    
    address[] public arrStudents; // массив студентов


    modifier restricted() {
        require(msg.sender == manager || msg.sender == owner);
        _;
    }

    modifier owned() {
        require(msg.sender == owner);
        _;
    }

    // Конструктор контракта
    function SimpleCert (address _manager, address _owner, string _courseName, uint _courseLength, string _teacherName) public {
        manager = _manager;
        owner = _owner;
        courseName = _courseName;
        courseLength = _courseLength;
        teacherName = _teacherName;
        
    }
    

    function registerStudent(string stName) public {
        //Регистрация нового студента на курс
        address newStudent = msg.sender;
        require(!isStudent[newStudent]);

        isStudent[newStudent] = true;
        NameStudent[newStudent] = stName;
        datePassedStudent[newStudent] = "";
        arrStudents.push(newStudent);
    }
  
 
    
    function setStudentPassed (address _addressStudent, string _date) public restricted {
        
        require(!passedStudent[_addressStudent]);    //проверка, что студент еще не сдал курс

        passedStudent[_addressStudent] = true;
        datePassedStudent[_addressStudent] = _date;
    }
    
    
    function getStudentsCount() public view returns (uint) {
        return arrStudents.length;
    }
    

    function killContract() public owned {
        selfdestruct(owner);
    }
   
}
