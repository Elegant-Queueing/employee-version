// Public DNS for AWS instance
var domain = "http://ec2-34-222-19-59.us-west-2.compute.amazonaws.com:8080";

// Class that establishes connection with backend APIs
class Connection {

    // Handles Employee Login
    login(username, password) {
        // Test: codealot@code.com

        var url = domain + "/employee/get/email/" + username;
        return $.ajax({
            url: url,
            type: "GET", 
            crossDomain: true,
            success: function(result) {
                
            }
        });
    }

    // Returns all career fairs
    getFairs() {
        var url = domain + "/fair/get-all";
        return $.ajax({url: url, type: "GET", success: function(result) {
            return result;
        }});
    }

    // Checks if given employee has opened a queue or not
    checkQueueIsOpen(employeeId) {
        var url = domain + "/queue/data/is-open/employee-id/" + employeeId;
        return $.ajax({
            url: url, 
            type: "GET",
            success: function(result) {

            },
            error: function(response) {
                console.log(response);
            }
        });
    }

    // Adds a queue for the employee
    addMyQueue(employeeId, companyId, role) {
        var url = domain + "/queue/add/company-id/" + companyId + "/employee-id/" + employeeId + "/role/" + role + "/";
        return $.ajax({
            url: url, 
            type: "POST",
            success: function(result) {

            },
            error: function(response) {
                console.log(response);
            }
        });
    }

    // Returns the profile for the employee
    getEmployeeProfile(employeeId) {
        var url = domain + "/employee/get/employee-id/" + employeeId;
        return $.ajax({url: url, type: "GET", success: function(result) {
            return result;
        }});
    }

    // Updates the employee's profile
    updateEmployeeProfile(employeeId, name, email, bio) {
        return { "updated":true };
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
            type: "POST", 
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
            type: "PUT", 
            crossDomain: true,
            success: function(result) {
                return result;
            },
            error : function(response) {
                console.log(response);
            }
        });
    }
}