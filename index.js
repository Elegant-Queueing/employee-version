// Transition from login page to list_of_fairs page
document.getElementById("login").onclick = function() {
    document.getElementById("login_page").style.display = "none";
    document.getElementById("list_of_fairs_page").style.display = "block";
}

// Transition from list_of_fairs page to fair_info page
document.getElementById("select_fair").onclick = function() {
    document.getElementById("list_of_fairs_page").style.display = "none";
    document.getElementById("fair_info_page").style.display = "block";
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
document.getElementById("submit-employee-profile").onclick = function() {
    document.getElementById("editing_profile").style.display = "none";
    document.getElementById("employee_profile").style.display = "block";
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