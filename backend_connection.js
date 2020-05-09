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
             "desc":"Hosted by UW CSE"
            },
            {"name":"UW Established Company Fair",
             "location":"HUB South Ballroom",
             "start_time":124521515,
             "end_time":124124667,
             "university":"University of Washington",
             "desc":"Hosted by UW CSE Established Companies"
            }
        ]
    }
}