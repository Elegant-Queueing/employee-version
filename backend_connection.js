// Public DNS for AWS instance
var domain = "http://ec2-54-218-124-234.us-west-2.compute.amazonaws.com:8080";
var employeeToken = "";

// Class that establishes connection with backend APIs
class Connection {

    // Handles Employee Login
    login(username, password) {
        return firebase.auth().signInWithEmailAndPassword(username, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
            alert("Authentication failed. Please log in again.");
            // ...
        }).then(function() {
            return firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
                // Send token to your backend via HTTPS
                // ...
                employeeToken = idToken;
                var url = domain + "/employee/get/email/" + username;
                return $.ajax({
                    url: url,
                    type: "GET", 
                    crossDomain: true,
                    headers: {
                        "token": employeeToken
                    },
                    statusCode: {
                        401: function() {
                            alert("Authentication failed. Please log in again.");
                            backToLoginPage();
                            return null;
                        },
                    },
                    success: function(result) {
                        
                    }
                });
            }).catch(function(error) {
                // Handle error
                console.log(error);
            });
        });
        
    }

    // Handles Employee Signup
    createUser(username, password, name, company, role, bio) {
        return firebase.auth().createUserWithEmailAndPassword(username, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        }).then(function() {
            return firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
                // Send token to your backend via HTTPS
                // ...
                var url = domain + "/employee/add";
                employeeToken = idToken;
                var employeeData = {"name":name,"company_id":company,"role":role,"bio":bio,"email":username,"students:":""};
                return $.ajax({
                    url: url,
                    type: "POST", 
                    crossDomain: true,
                    headers: {
                        "token": idToken,
                        "Content-Type": "application/json"
                    },
                    statusCode: {
                        401:function() {
                            alert("Authentication failed. Please log in again.");
                            backToLoginPage();
                        },
                        400:function() {
                            alert("Please fill in all fields with the correct format.");
                        },
                    },
                    data: JSON.stringify(employeeData),
                    success: function(result) {
                        
                    },
                    error: function(response) {
                        console.log(response);
                    }
                });
            }).catch(function(error) {
                // Handle error
                console.log(error);
            });
        });
    }

    // Returns all career fairs
    getFairs() {
        var url = domain + "/fair/get-all";
        return $.ajax({
            url: url,
            type: "GET",
            headers: {
                "token": employeeToken,
                "Content-Type": "application/json"
            },
            statusCode: {
                401:function() {
                    alert("Authentication failed. Please log in again.");
                    backToLoginPage();
                },
            },
            success: function(result) {
                return result;
            }
        });
    }

    // Adds a queue for the employee
    addMyQueue(employeeId, companyId, role) {
        var url = domain + "/queue/add/company-id/" + companyId + "/employee-id/" + employeeId + "/role/" + role + "/";
        return $.ajax({
            url: url, 
            method: "POST",
            headers: {
                "token": employeeToken,
                "Content-Type": "application/json"
            },
            statusCode: {
                401:function() {
                    alert("Authentication failed. Please log in again.");
                    backToLoginPage();
                },
            },
            success: function(result) {

            },
            error: function(response) {
                console.log(response);
            }
        });
    }

    getCompanyName(rawFair, companyId) {
        var url = domain + "/fair/get/fair-id/" + rawFair + "/company-id/" + companyId;
        return $.ajax({
            url: url,
            type: "GET",
            headers: {
                "token": employeeToken,
                "Content-Type": "application/json"
            },
            statusCode: {
                401:function() {
                    alert("Authentication failed. Please log in again.");
                    backToLoginPage();
                },
            },
            success: function(result) {
                return result;
            }
        });
    }

    // Returns the profile for the employee
    getEmployeeProfile(employeeId) {
        var url = domain + "/employee/get/employee-id/" + employeeId;
        return $.ajax({
            url: url,
            type: "GET",
            headers: {
                "token": employeeToken,
                "Content-Type": "application/json"
            },
            statusCode: {
                401:function() {
                    alert("Authentication failed. Please log in again.");
                    backToLoginPage();
                },
            },
            success: function(result) {
                return result;
            }
        });
    }

    // Updates the employee's profile
    updateEmployeeProfile(employeeInfo, name, email, bio) {
        var url = domain + "/employee/update/employee-id/" + employeeInfo["employee_id"];
        var employeeData = {"name":name,"company_id":employeeInfo["company_id"],"role":employeeInfo["role"],"bio":bio,"email":email,"students:":""};
        console.log(employeeData)
        return $.ajax({
            url: url,
            method: "PUT", 
            crossDomain: true,
            headers: {
                "token": employeeToken,
                "Content-Type": "application/json"
            },
            statusCode: {
                401:function() {
                    alert("Authentication failed. Please log in again.");
                    backToLoginPage();
                }
            },
            data: JSON.stringify(employeeData),
            success: function(result) {
                
            },
            error: function(response) {
                console.log(response);
            }
        });
    }

    // Returns all career fairs the employee has attended (In Progress)
    getPastFairsForEmployee(employeeId) {
        return [
            {"name":"UW CSE Fair",
             "location":"HUB South Ballroom",
             "start_time":124521515,
             "end_time":124124667,
             "university":"University of Washington",
             "desc":"Hosted by UW CSE",
             "fairId":"abc1"
            },
            {"name":"UW Established Company Fair",
             "location":"HUB South Ballroom",
             "start_time":124521515,
             "end_time":124124667,
             "university":"University of Washington",
             "desc":"Hosted by UW CSE Established Companies",
             "fairId":"abc123"
            }
        ]
    }

    // Returns all the students the employee has talked to at the given career fair (In Progress)
    getPastStudentsForEmployee(employeeId, fairId) {
        return [
            {"name":"Alex Zhang",
             "studentId":"student1",
             "tags":["Excellent", "Yes"]
            },
            {"name":"Alex Z",
             "studentId":"student2",
             "tags":["Nope", "Yes"]
            }
        ]
    }

    // Returns the profile for student
    getStudentProfile(studentId) {
        var url = domain + "/student/get/student-id/" + studentId;
        return $.ajax({
            url: url,
            type: "GET", 
            headers: {
                "token": employeeToken,
                "Content-Type": "application/json"
            },
            statusCode: {
                401:function() {
                    alert("Authentication failed. Please log in again.");
                    backToLoginPage();
                },
            },
            success: function(result) {
                return result;
            },
            error : function(response) {
                console.log(response);
            }
        });
    }


    // Checks if the employee already has a queue
    checkQueueIsOpen(employeeId) {
        var url  = domain + "/queue/data/is-open/employee-id/" + employeeId;
        return $.ajax({
            url: url,
            method: "GET",
            headers: {
                "token": employeeToken,
            },
            statusCode: {
                401:function() {
                    alert("Authentication failed. Please log in again.");
                    backToLoginPage();
                },
            },
            success: function(result) {
                return result;
            },
            error : function(response) {
                console.log(response);
            }
        });
    }

    // Returns current students in the employee's queue
    getMyStudents(employeeId) {
        var url = domain + "/queue/data/employee-id/" + employeeId;
        return $.ajax({
            url: url,
            type: "GET",
            headers: {
                "token": employeeToken,
                "Content-Type": "application/json"
            },
            statusCode: {
                401:function() {
                    alert("Authentication failed. Please log in again.");
                    backToLoginPage();
                },
            },
            success: function(result) {
                return result;
            },
            error : function(response) {
                console.log(response);
            }
        });
    }

    // Remove the student from the queue
    skipStudent(studentId, employeeId) {
        var url = domain + "/queue/remove-student/employee-id/" + employeeId + "/student-id/" + studentId;
        return $.ajax({
            url: url, 
            type: "DELETE", 
            headers: {
                "token": employeeToken,
                "Content-Type": "application/json"
            },
            statusCode: {
                401:function() {
                    alert("Authentication failed. Please log in again.");
                    backToLoginPage();
                },
            },
            success: function(result) {
                return result;
            },
            error : function(response) {
                console.log(response);
            }
        });
    }

    // Save the student in the employee's history and removes the student from the queue
    registerStudent(employeeId, studentId, fairId, tags) {
        var url = domain + "/queue/register-student/employee-id/" + employeeId + "/student-id/" + studentId;
        return $.ajax({
            url: url, 
            method: "POST", 
            headers: {
                "token": employeeToken,
                "Content-Type": "application/json"
            },
            statusCode: {
                401:function() {
                    alert("Authentication failed. Please log in again.");
                    backToLoginPage();
                },
            },
            success: function(result) {
                return result;
            },
            error : function(response) {
                console.log(response);
            }
        });
    }

    // Returns the tags the employee created
    getTags(employeeId) {
        return ["Excellent", "Yes", "Cool"];
    }

    // Stop the employee's queue
    stopMyQueue(employeeId) {
        var url = domain + "/queue/status/employee-id/" + employeeId;
        return $.ajax({
            url: url,
            method: "PUT", 
            crossDomain: true,
            headers: {
                "token": employeeToken,
                "Content-Type": "application/json"
            },
            statusCode: {
                401:function() {
                    alert("Authentication failed. Please log in again.");
                    backToLoginPage();
                },
            },
            success: function(result) {
                return result;
            },
            error : function(response) {
                console.log(response);
            }
        });
    }
}