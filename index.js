var connect = new Connection();
var employeeId = "";
var listOfFairs = [];
var fairs;
// var fairId;
var employeeInfo;
var listOfFairsHistory = [];
var listOfStudentsHistory = [];
var listOfTags = connect.getTags(employeeId);

var queue = [];
var notOperatingQueue = true;
var queueStopped = false;
var update;

// Show the list of career fairs
function showFairs() {
    // Get and Show Fairs
    connect.getFairs().then(function(result) {
        listOfFairs = result.fairs;
        if (listOfFairs != null) {
            var innerListOfFairs = "";
            for (i = 0; i < listOfFairs.length; i++) {
                var fairName = listOfFairs[i]["name"];
                innerListOfFairs +=
                    "<div>" +
                        "<div style=\"display: inline-block;width: 500px;\">" + fairName + " " + "</div>" +
                        "<button onclick=\"showFairInfo('" + fairName + "');\">select</button>" +
                    "</div>";
            }
            document.getElementById("fairs").innerHTML = innerListOfFairs;
        }
    });
}

// Transition from login page to list_of_fairs page
document.getElementById("login").onclick = function() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    document.getElementById("username").value = "";
    document.getElementById("password").value = "";

    connect.login(username, password).then(function(r) {
        console.log(r);
        employeeInfo = r;
        if (employeeInfo != null) {
            document.getElementById("login_page").style.display = "none";
            document.getElementById("list_of_fairs_page").style.display = "block";
            employeeId = employeeInfo["employee_id"];
        } else {
            alert("Login Failed.");
        }

        showFairs();
    });
}

// Clear information in the sign up form
function clearSignupInfo() {
    document.getElementById("create_username").value = "";
    document.getElementById("create_password").value = "";
    document.getElementById("create_name").value = "";
    document.getElementById("create_bio").value = "";
    document.getElementById("create_company").value = "";
    document.getElementById("create_role").value = "";
}

// Submit sign up information
document.getElementById("submit_signup").onclick = function() {
    var username = document.getElementById("create_username").value;
    var password = document.getElementById("create_password").value;
    var name = document.getElementById("create_name").value;
    var bio = document.getElementById("create_bio").value;
    var company = document.getElementById("create_company").value;
    var role = document.getElementById("create_role").value;

    if (username == "" || password == "" || name == "" || company == "") {
        alert("Please fill in all information in the correct format.");
    } else {
        connect.createUser(username, password, name, company, role, bio).then(function(result) {
            clearSignupInfo();
            console.log(result);
            employeeInfo = result;
            // If successful
            alert("Successfully signed up! Logged in as " + username);
            document.getElementById("list_of_fairs_page").style.display = "block";
            document.getElementById("signup_page").style.display = "none";

            showFairs();
        });
    });
}

// Transition from list_of_fairs page to fair_info page
function showFairInfo(fairName) {
    document.getElementById("list_of_fairs_page").style.display = "none";
    document.getElementById("fair_info_page").style.display = "block";

    var fair;
    for (j = 0; j < listOfFairs.length; j++) {
        if (listOfFairs[j]["name"] === fairName) {
            fair = listOfFairs[j];
        }
    }

    var startTime = new Date(fair["start_time"]["seconds"] * 1000);
    var endTime = new Date(fair["end_time"]["seconds"] * 1000);
    document.getElementById("fair_info").innerHTML = 
        "<div>" + fairName + "</div>" +
        "<div>Location: " + fair["university_id"] + "</div>" +
        "<div>Start Time: " + startTime + "</div>" +
        "<div>End Time: " + endTime + "</div>" +
        "<div>Description: " + fair["description"] + "</div>";
    // fairId = fair["fairId"];
}

// Transition from list_of_fairs page to employee profile page
document.getElementById("employee_profile_button").onclick = function() {
    document.getElementById("list_of_fairs_page").style.display = "none";
    document.getElementById("employee_profile_page").style.display = "block";

    if (employeeInfo != null) {
        document.getElementById("employee_info").innerHTML = 
            "<div>Name: " + employeeInfo["name"] + "</div>" +
            "<div>Company: " + employeeInfo["company_id"] + "</div>" +
            "<div>Role: " + employeeInfo["role"] + "</div>" +
            "<div>Email: " + employeeInfo["email"] + "</div>" +
            "<div>Bio: " + employeeInfo["bio"] + "</div>";
    }
}

// Transition from fair_info page to queue info page
document.getElementById("add_queue").onclick = function() {
    connect.checkQueueIsOpen(employeeId).then(function(result) {
        console.log(result);
        if (!result["present"]) {
            console.log("adding queue");
            connect.addMyQueue(employeeId, employeeInfo["company_id"], employeeInfo["role"]).then(function(result) {
                console.log(result);
                if (result != null) {
                    document.getElementById("fair_info_page").style.display = "none";
                    document.getElementById("queue_page").style.display = "block";
                }
            
                updateQueue();
                update = setInterval(updateQueue, 5000);
            });
        } else {
            document.getElementById("fair_info_page").style.display = "none";
            document.getElementById("queue_page").style.display = "block";
            updateQueue();
            update = setInterval(updateQueue, 5000);
        }
    });
}

function updateQueue() {
    if (notOperatingQueue) {
        notOperatingQueue = false;
        console.log("Update Queue");
        connect.getMyStudents(employeeId).then(function(result) {
            var inner = "";
            queue = result.data["students"];
            console.log(queue);
            if (queue.length > 0) {
                var student = queue[0];
                console.log(student);
                inner +=
                    "<div> Student: " +  
                        "<div style=\"display: inline-block;\">" + student["name"] + "</div>" +             
                        "<button style=\"display: inline-block;\" onclick=\"showStudentProfile('" + student["id"]+ "');\">Profile</button>" +
                        "<button style=\"display: inline-block;\" onclick=\"skipStudent('" + student["id"]+ "');\">Skip</button>" +
                        "<button style=\"display: inline-block;\" onclick=\"doneTalkingStudent('" + student["id"]+ "');\">Done Talking</button>" +
                    "</div>";
            }

            for (i = 1; i < queue.length; i++) {
                var student = queue[i];
                inner += 
                    "<div> Student: " +  
                        "<div style=\"display: inline-block;\">" + student["name"] + "</div>" +
                    "</div>";
            }

            document.getElementById("queue").innerHTML = inner;
            notOperatingQueue = true;
        });
    }
}

// Transition from queue info page to student profile page
function showStudentProfile(studentId) {
    document.getElementById("queue_page").style.display = "none";
    document.getElementById("student_profile_page").style.display = "block";

    connect.getStudentProfile(studentId).then(function(result) {
        var student = result.student;
        if (student != null) {
            document.getElementById("student_info").innerHTML = 
                "<div> Name: " + student["first_name"] + " " + student["last_name"] + "</div>" +
                "<div> University: " + student["university_id"] + "</div>" +
                "<div> Major: " + student["major"] + "</div>" +
                "<div> Role: " + student["role"] + "</div>" +
                "<div> GPA: " + student["gpa"] + "</div>" +
                "<div> Email: " + student["email"] + "</div>" +
                "<div> Graduation Date: " + new Date(student["grad_date"] * 1000) + "</div>" +
                "<div> International: " + student["international"] + "</div>" +
                "<div> Bio: " + student["bio"] + "</div>";
        }
    });
}
// Create tags
var innerHTMLTags = "";
for (i = 0; i < listOfTags.length; i++) {
    innerHTMLTags +=
        "<div>" + listOfTags[i] + "<input type=\"checkbox\" value=true id=\"tag_" + i + "\"></div>";
}
document.getElementById("list_of_tags").innerHTML = innerHTMLTags;

// Skip student
function skipStudent(studentId) {
    if (notOperatingQueue) {
        notOperatingQueue = false;
        connect.skipStudent(studentId, employeeId).then(function(result) {
            queue.shift();

            var inner = "";
            if (queue.length > 0) {
                var student = queue[0];
                inner +=
                    "<div> Student: " +  
                        "<div style=\"display: inline-block;\">" + student["name"] + "</div>" +             
                        "<button style=\"display: inline-block;\" onclick=\"showStudentProfile('" + student["id"]+ "');\">Profile</button>" +
                        "<button style=\"display: inline-block;\" onclick=\"skipStudent('" + student["id"]+ "');\">Skip</button>" +
                        "<button style=\"display: inline-block;\" onclick=\"doneTalkingStudent('" + student["id"]+ "');\">Done Talking</button>" +
                    "</div>";
            }

            for (i = 1; i < queue.length; i++) {
                var student = queue[i];
                inner += 
                    "<div> Student: " +  
                        "<div style=\"display: inline-block;\">" + student["name"] + "</div>" +
                    "</div>";
            }

            document.getElementById("queue").innerHTML = inner; 

            // if done talking with all students and the queue has been stopped, return to list_of_fairs page
            if (queue.length == 0 && queueStopped) {
                document.getElementById("fair_info_page").style.display = "block";
                document.getElementById("queue_page").style.display = "none";
                document.getElementById("stop_queue_desc").innerHTML = 
                    "<button id=\"stop_queue\">Stop My Queue</button>";
            }
            notOperatingQueue = true;
        });
    } else {
        alert("Operation happened on current queue. Try again.");
    }
}

// Done talking with a student
function doneTalkingStudent(studentId) {
    if (notOperatingQueue) {
        notOperatingQueue = false;
        // var tags = [];

        // for (i = 0; i < listOfTags.length; i++) {
        //     var id = "tag_" + i;
        //     if (document.getElementById(id).checked) {
        //         tags.push(listOfTags[i]);
        //         document.getElementById(id).checked = false;
        //     }
        // }

        connect.registerStudent(employeeId, studentId, "", []).then(function(result) {
            queue.shift();

            var inner = "";
            if (queue.length > 0) {
                var student = queue[0];
                inner +=
                    "<div> Student: " +  
                        "<div style=\"display: inline-block;\">" + student["name"] + "</div>" +             
                        "<button style=\"display: inline-block;\" onclick=\"showStudentProfile('" + student["id"]+ "');\">Profile</button>" +
                        "<button style=\"display: inline-block;\" onclick=\"skipStudent('" + student["id"]+ "');\">Skip</button>" +
                        "<button style=\"display: inline-block;\" onclick=\"doneTalkingStudent('" + student["id"]+ "');\">Done Talking</button>" +
                    "</div>";
            }

            for (i = 1; i < queue.length; i++) {
                var student = queue[i];
                inner += 
                    "<div> Student: " +  
                        "<div style=\"display: inline-block;\">" + student["name"] + "</div>" +
                    "</div>";
            }

            document.getElementById("queue").innerHTML = inner;

            // if done talking with all students and the queue has been stopped, return to list_of_fairs page
            if (queue.length == 0 && queueStopped) {
                document.getElementById("fair_info_page").style.display = "block";
                document.getElementById("queue_page").style.display = "none";
                document.getElementById("stop_queue_desc").innerHTML = 
                    "<button id=\"stop_queue\">Stop My Queue</button>";
            }

            notOperatingQueue = true;
        });
    } else {
        alert("Operation happened on current queue. Try again.");
    }
}

// Edit profile
document.getElementById("edit_employee_profile").onclick = function() {
    document.getElementById("editing_profile").style.display = "block";
    document.getElementById("employee_profile").style.display = "none";
}
// Submit profile changes
document.getElementById("submit_employee_profile").onclick = function() {
    document.getElementById("editing_profile").style.display = "none";
    document.getElementById("employee_profile").style.display = "block";

    var newName = document.getElementById("new_name").value;
    var newEmail = document.getElementById("new_email").value;
    var newBio = document.getElementById("new_bio").value;

    if (newName === "") {
        newName = employeeInfo["name"];
    }
    if (newEmail === "") {
        newEmail = employeeInfo["email"];
    }
    if (newBio === "") {
        newBio = employeeInfo["bio"];
    }

    var result = connect.updateEmployeeProfile(employeeInfo, newName, newEmail, newBio);
    if (result["updated"]) {
        employeeInfo["name"] = newName;
        employeeInfo["email"] = newEmail;
        employeeInfo["bio"] = newBio;

        document.getElementById("employee_info").innerHTML = 
            "<div>Image: " + employeeInfo["img"] + "</div>" +
            "<div>Name: " + employeeInfo["name"] + "</div>" +
            "<div>Company: " + employeeInfo["company"] + "</div>" +
            "<div>Position: " + employeeInfo["position"] + "</div>" +
            "<div>Email: " + employeeInfo["email"] + "</div>" +
            "<div>Bio: " + employeeInfo["bio"] + "</div>";
        
        document.getElementById("new_name").value = "";
        document.getElementById("new_email").value = "";
        document.getElementById("new_bio").value = "";
    }
}



// View career fairs history
document.getElementById("view_history").onclick = function() {
    document.getElementById("fairs_history_page").style.display = "block";
    document.getElementById("employee_profile_page").style.display = "none";

    listOfFairsHistory = connect.getPastFairsForEmployee(employeeId);
    var innerListOfFairs = "";
    for (i = 0; i < listOfFairsHistory.length; i++) {
        var fairName = listOfFairsHistory[i]["name"];
        innerListOfFairs +=
            "<div>" +
                "<div style=\"display: inline-block;\">" + fairName + " " + "</div>" +
                "<button onclick=\"showFairInfoHistory('" + fairName + "');\">select</button>" +
            "</div>";
    }
    document.getElementById("fairs_history").innerHTML = innerListOfFairs;
}

function showFairInfoHistory(fairName) {
    document.getElementById("student_history_page").style.display = "block";
    document.getElementById("fairs_history_page").style.display = "none";

    var fair;
    for (i = 0; i < listOfFairsHistory.length; i++) {
        if (listOfFairsHistory[i]["name"] === fairName) {
            fair = listOfFairsHistory[i];
        }
    }

    var startTime = new Date(fair["start_time"]);
    var endTime = new Date(fair["end_time"]);
    document.getElementById("fair_history_info").innerHTML = 
        "<div>" + fairName + "</div>" +
        "<div>Location: " + fair["location"] + "</div>" +
        "<div>Start Time: " + startTime + "</div>" +
        "<div>End Time: " + endTime + "</div>" +
        "<div>Description: " + fair["desc"] + "</div>";
    var fairHistoryId = fair["fairId"];

    // Get students for the fair
    listOfStudentsHistory = connect.getPastStudentsForEmployee(employeeId, fairHistoryId);
    var inner = "";
    for (i = 0; i < listOfStudentsHistory.length; i++) {
        var studentName = listOfStudentsHistory[i]["name"];
        var studentId = listOfStudentsHistory[i]["id"];
        var tags = listOfStudentsHistory[i]["tags"];

        var stringTags = "";
        if (tags.length > 0) {
            for (j = 0; j < tags.length - 1; j++) {
                stringTags += tags[j] + ", ";
            }
            stringTags += tags[tags.length - 1];
        }

        inner += 
            "<div>" + 
                "<div style=\"display: inline-block;\">" + studentName + "  Tags: " + stringTags + "</div>" +
                "<button onclick=\"getStudentHistoryProfile('" + studentId + "');\" style=\"display: inline-block;\">Profile</button>" +
            "</div>";
    }

    document.getElementById("student_history").innerHTML = inner;
}

// View one student history
function getStudentHistoryProfile(studentId) {
    document.getElementById("student_history_profile_page").style.display = "block";
    document.getElementById("student_history_page").style.display = "none";


    connect.getStudentProfile(studentId).then(function(result) {
        var student = result.student;
        if (student != null) {
            document.getElementById("student_history_info").innerHTML = 
                "<div> Name: " + student["first_name"] + " " + student["last_name"] + "</div>" +
                "<div> University: " + student["university_id"] + "</div>" +
                "<div> Major: " + student["major"] + "</div>" +
                "<div> Role: " + student["role"] + "</div>" +
                "<div> GPA: " + student["gpa"] + "</div>" +
                "<div> Email: " + student["email"] + "</div>" +
                "<div> Graduation Date: " + new Date(student["grad_date"] * 1000) + "</div>" +
                "<div> International: " + student["international"] + "</div>" +
                "<div> Bio: " + student["bio"] + "</div>";
        }
    });
}



// Back to login page
document.getElementById("back_to_login").onclick = function() {
    document.getElementById("login_page").style.display = "block";
    document.getElementById("list_of_fairs_page").style.display = "none";
}

// Back to list of fairs page
document.getElementById("back_to_fairs").onclick = function() {
    document.getElementById("list_of_fairs_page").style.display = "block";
    document.getElementById("fair_info_page").style.display = "none";
}

// Back to list of fairs page
document.getElementById("back_to_fairs_e").onclick = function() {
    document.getElementById("editing_profile").style.display = "none";
    document.getElementById("employee_profile").style.display = "block";
    document.getElementById("list_of_fairs_page").style.display = "block";
    document.getElementById("employee_profile_page").style.display = "none";
}

// Back to fair_info page
document.getElementById("stop_queue").onclick = function() {
    connect.stopMyQueue(employeeId).then(function() {
        clearInterval(update);
        queueStopped = true;

        if (queue.length == 0) {
            document.getElementById("fair_info_page").style.display = "block";
            document.getElementById("queue_page").style.display = "none";
            document.getElementById("stop_queue_desc").innerHTML = 
                "<button id=\"stop_queue\">Stop My Queue</button>";
        } else {
            document.getElementById("stop_queue_desc").innerHTML = 
                "<div>Your queue has been stopped. No more students will join your queue. Returning to list of fairs page after done talking with current students in the queue.</div>";
        }
    });
}

// Back to queue info page
document.getElementById("back_to_queue").onclick = function() {
    document.getElementById("queue_page").style.display = "block";
    document.getElementById("student_profile_page").style.display = "none";
}

// Back to employee_profile
document.getElementById("back_to_profile").onclick = function() {
    document.getElementById("fairs_history_page").style.display = "none";
    document.getElementById("employee_profile_page").style.display = "block";
}
// Back to fairs_history_page
document.getElementById("back_to_fair_history").onclick = function() {
    document.getElementById("student_history_page").style.display = "none";
    document.getElementById("fairs_history_page").style.display = "block";
}
// Back to student_history_page
document.getElementById("back_to_student_history").onclick = function() {
    document.getElementById("student_history_profile_page").style.display = "none";
    document.getElementById("student_history_page").style.display = "block";
}

// Go to sign up page
document.getElementById("signup").onclick = function() {
    document.getElementById("login_page").style.display = "none";
    document.getElementById("signup_page").style.display = "block";
}

// Back to login from sign up page
document.getElementById("back_to_login_signup").onclick = function() {
    document.getElementById("login_page").style.display = "block";
    document.getElementById("signup_page").style.display = "none";

    clearSignupInfo();
}

// Back to login page
function backToLoginPage() {
    document.getElementById("list_of_fairs_page").style.display = "none";
    document.getElementById("fair_info_page").style.display = "none";
    document.getElementById("employee_profile_page").style.display = "none";
    document.getElementById("queue_page").style.display = "none";
    document.getElementById("student_profile_page").style.display = "none";
    document.getElementById("fairs_history_page").style.display = "none";
    document.getElementById("student_history_page").style.display = "none";
    document.getElementById("student_history_profile_page").style.display = "none";
    
    document.getElementById("login_page").style.display = "block";
}