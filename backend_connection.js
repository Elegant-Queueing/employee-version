class Connection {
    login(username, password) {
        // TODO: Connect to backend
        return { "authenticated":true, "employeeId":"id" };
    }

    getFairs(employeeId) {
        // TODO: Connect to backend
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

    addMyQueue(employeeId, fairId) {
        return { "created":true };
    }

    getEmployeeProfile(employeeId) {
        return {
            "name":"Alex",
            "company":"Amazon",
            "position":"SDE 1",
            "bio":"Hello World",
            "img":"profile.png",
            "email":"abc123@gmail.com"
       }
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
        return {
            "name":"Alex Zhang",
            "img":"profile.png",
            "university":"University of Washington",
            "major":"CSE",
            "graduationDate":20551151515,
            "resume":"Resume"
       }
    }

    getMyStudents(employeeId) {
        return [
            {
                "name":"Alex Zhang",
                "studentId":"student1"
            },
            {
                "name":"Alex Z",
                "studentId":"student2"
            }
        ]
    }

    skipStudent(studentId, employeeId) {
        return { "skipped":true }
    }

    registerStudent(employeeId, studentId, fairId, tags) {
        return { "registered":true }
    }

    getTags(employeeId) {
        return ["Excellent", "Yes", "Cool"];
    }

    stopMyQueue(employeeId) {
        return { "stopped":true }
    }
}