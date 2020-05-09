var connect = new Connection();
var employeeId = "";
var listOfFairs = [];
var fairs;

// Transition from login page to list_of_fairs page
document.getElementById("login").onclick = function() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    var result = connect.login(username, password)
    if (result["authenticated"]) {
        document.getElementById("login_page").style.display = "none";
        document.getElementById("list_of_fairs_page").style.display = "block";
        employeeId = result["employeeId"];
    } else {
        alert("Login Failed.");
    }
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";

    // Get and Show Fairs
    listOfFairs = connect.getFairs(employeeId);
    var innerListOfFairs = "";
    for (i = 0; i < listOfFairs.length; i++) {
        var fairName = listOfFairs[i]["name"];
        innerListOfFairs +=
            "<div>" +
                "<div style=\"display: inline-block;\">" + fairName + " " + "</div>" +
                "<button onclick=\"showFairInfo('" + fairName + "');\">select</button>" +
            "</div>";
    }
    document.getElementById("fairs").innerHTML = innerListOfFairs;
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

    var startTime = new Date(fair["start_time"]);
    var endTime = new Date(fair["end_time"]);
    document.getElementById("fair_info").innerHTML = 
        "<div>" + fairName + "</div>" +
        "<div>Location: " + fair["location"] + "</div>" +
        "<div>Start Time: " + startTime + "</div>" +
        "<div>End Time: " + endTime + "</div>" +
        "<div>Description: " + fair["desc"] + "</div>";
}

// Transition from list_of_fairs page to employee profile page
document.getElementById("employee_profile_button").onclick = function() {
    document.getElementById("list_of_fairs_page").style.display = "none";
    document.getElementById("employee_profile_page").style.display = "block";
}

// Transition from fair_info page to queue info page
document.getElementById("add_queue").onclick = function() {
    document.getElementById("fair_info_page").style.display = "none";
    document.getElementById("queue_page").style.display = "block";
}

// Transition from queue info page to student profile page
document.getElementById("student_profile_1").onclick = function() {
    document.getElementById("queue_page").style.display = "none";
    document.getElementById("student_profile_page").style.display = "block";
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
    document.getElementById("fair_info_page").style.display = "block";
    document.getElementById("queue_page").style.display = "none";
}

// Back to queue info page
document.getElementById("back_to_queue").onclick = function() {
    document.getElementById("queue_page").style.display = "block";
    document.getElementById("student_profile_page").style.display = "none";
    // TODO: Save tags
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
}



// View career fairs history
document.getElementById("view_history").onclick = function() {
    document.getElementById("fairs_history_page").style.display = "block";
    document.getElementById("employee_profile_page").style.display = "none";
}
// Back to employee_profile
document.getElementById("back_to_profile").onclick = function() {
    document.getElementById("fairs_history_page").style.display = "none";
    document.getElementById("employee_profile_page").style.display = "block";
}
// View one career fair history
document.getElementById("select_fair_history").onclick = function() {
    document.getElementById("student_history_page").style.display = "block";
    document.getElementById("fairs_history_page").style.display = "none";
}
// Back to employee_profile
document.getElementById("back_to_fair_history").onclick = function() {
    document.getElementById("student_history_page").style.display = "none";
    document.getElementById("fairs_history_page").style.display = "block";
}
// View one student history
document.getElementById("student_history_profile").onclick = function() {
    document.getElementById("student_history_profile_page").style.display = "block";
    document.getElementById("student_history_page").style.display = "none";
}
// Back to employee_profile
document.getElementById("back_to_student_history").onclick = function() {
    document.getElementById("student_history_profile_page").style.display = "none";
    document.getElementById("student_history_page").style.display = "block";
}

// Remove student
document.getElementById("skip_student_1").onclick = function() {
    document.getElementById("student_1").style.display = "none";
}

// Remove student
document.getElementById("remove_student_1").onclick = function() {
    document.getElementById("student_1").style.display = "none";
    // TODO: Save tags
}