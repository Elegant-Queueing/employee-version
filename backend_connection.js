var domain = "http://ec2-52-24-135-0.us-west-2.compute.amazonaws.com:8080";

class Connection {

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

    getFairs() {
        var url = domain + "/fair/get-all";
        return $.ajax({url: url, type: "GET", success: function(result) {
            return result;
        }});
    }

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

    getEmployeeProfile(employeeId) {
        var url = domain + "/employee/get/employee-id/" + employeeId;
        return $.ajax({url: url, type: "GET", success: function(result) {
            return result;
        }});
    }

    updateEmployeeProfile(employeeId, name, email, bio) {
        return { "updated":true };
    }

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

    getTags(employeeId) {
        return ["Excellent", "Yes", "Cool"];
    }

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