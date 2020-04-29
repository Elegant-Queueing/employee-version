// Transition from 1st page to 2nd page
document.getElementById("login").onclick = function() {
    document.getElementById("first_page").style.display = "none";
    document.getElementById("second_page").style.display = "block";
}

// Transition from 1st page to 3rd page
document.getElementById("select_fair").onclick = function() {
    document.getElementById("second_page").style.display = "none";
    document.getElementById("third_page").style.display = "block";
}

// Back to 1st page
document.getElementById("back_1").onclick = function() {
    document.getElementById("first_page").style.display = "block";
    document.getElementById("second_page").style.display = "none";
}

// Back to 2nd page
document.getElementById("back_2").onclick = function() {
    document.getElementById("second_page").style.display = "block";
    document.getElementById("third_page").style.display = "none";
}