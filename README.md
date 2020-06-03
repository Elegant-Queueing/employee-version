# Q - Employee-version
This is the repository that manages the front end (web app) of the employee version

# User Guide
## Description
The employee version of Q allows recruiters to view student information and manage the queue of students at career fairs. Our app helps reduce the crowding at career fairs and improve the efficiency significantly.

## Installation, Run & Use the Web App
### Installation & Run
 - Clone the repository
 - Open index.html in a browser
### Use the Web App
#### Log In
 - For first time user, click "Sign Up"; fill in all fields with the correct format and click submit
 - For returning user, log in with username and password
#### Employee Profile
 - Click "Profile" to see the employee's information
 - Click "Edit Profile" on profile page to update the employee's information
 - (In progress) Click "View History" on profile page to see the career fairs and students the employee has visited
#### Join a Career Fair and Start Queue
 - Select the career fair the employee is attending
 - Click "Add My Queue" to instantiate the employee's queue
 - Information of students will show up as students join the employee's queue on student version of the app
 - Click "Profile" to see the student's information
 - (In progress) Click on tags to add tags for the student
 - If student doesn't show up, click "Skip" to remove him/her
 - After finishing the conversation, click "Done Talking" to remove him/her
 - When about to leave the career fair, click "Stop Queue"; will returning to the career fair information after finishing talking with all students in the current queue
 
 
 ## Report a Bug
  - Contact zhang008228@gmail.com with the following information: Issue, How to reproduce the bug, Relevancy of the bug (1 - 5).
  - Or raise a well documented [GitHub issue](https://github.com/Elegant-Queueing/employee-version/issues) with details on how to reproduce the bug, along with the relevant tag.
  
  # Developer Guide
  ## Obtain the Source Code
   - To obtain the employer front-end source code, simply clone this repository.
   - For the backend java sources: https://github.com/Elegant-Queueing/q-backend
   - For the student application front-end: https://github.com/Elegant-Queueing/student-version
  
  ## Layout/Structure
   - index.html: HTML elements and structure of the web app
   - index.css: Style
   - index.js: Script for transitioning between pages, processing front-end input, and displaying backend data
   - backend_connection.js: Script for establishing connection with backend AWS instance and sending HTTP request
   
  ## Build the Software
   - Set up an AWS instance as described in the [q-backend readme](https://github.com/Elegant-Queueing/q-backend) and change the "domain" variable in backend_connection.js to your AWS instance public DNS (ec2-x-x-x-x.us-west-2.compute.amazonaws.com)
   - No build system for this web app. Open index.html in a browser to run the application
  
  ## Test the Software
   - Run the web application in a browser to check if the app is behaving as expected.
   
  ## Adding tests 
   - Currently there is no infrastructure set to add tests to the employer front-end. This section will be updated if and when that is setup.
