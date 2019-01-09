const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');
const port = process.env.PORT || 3000;
app.set('view engine', 'ejs');
app.set(express.static(path.join(__dirname, '/views')));
//Path to public
app.use(express.static(path.join(__dirname + '/public')));
app.use(express.urlencoded({
    extended: true
}));
app.get('/', (req, res) => res.render('home.ejs'));

/*Create one route:
- route 1: renders a page that displays all your users.*/
app.get('/users', (req, res) => {
    fs.readFile('./users.json', 'utf8', (err, data) => {
        if (err) throw err;
        let parsedData = JSON.parse(data);
        res.render('users', {
            users: parsedData
        })
    });

});
/*Part 1
- route 2: renders a page that displays a form which is your search bar.*/

app.get('/search', (req, res) => res.render('search.ejs'));

/*- route 3: takes in the post request from your form, then displays matching users on a new page. 
Users should be matched based on whether either their first or last name contains the input string.*/
app.post('/search', (req, res) => {
    fs.readFile('./users.json', 'utf8', (err, data) => {
        if (err) throw err;
        let parsedData = JSON.parse(data);
        let result = [];

        parsedData.forEach(function (currentUser, index, arr) {
            if (req.body.search.toLowerCase() == currentUser.firstname.toLowerCase() || req.body.search.toLowerCase() == currentUser.lastname.toLowerCase()) {
                result.push(currentUser);
            }
        });
        res.render('users', {
            users: result
        })
    });
});

// ajax call
app.post('/ajaxcall', (req, res) => {
    let inputFromUser = req.body.name;
    fs.readFile('./users.json', 'utf8', (err, data) => {
        if (err) throw err;
        let parsedData = JSON.parse(data);
        let result = [];

        parsedData.forEach((currentUser) => {
            if (currentUser.firstname.toLowerCase().includes(inputFromUser) || currentUser.lastname.toLowerCase().includes(inputFromUser)) {
                result.push(currentUser);
            }
        });
        res.send(result)
        
    });
    
});


/*- route 4: renders a page with three inputs on it (first name, last name, and email) that allows you 
to add new users to the users.json file.*/


app.get('/create', (req, res) => res.render('create.ejs'));


/*route 5: takes in the post request from the 'create user'form, then adds the user to the users.json file.*/

app.post('/create', (req, res) => {

    fs.readFile('./users.json', 'utf8', (err, data) => {
        if (err) throw err;

        let parsedData = JSON.parse(data);
        let newUser = {
            firstname: req.body.firstName,
            lastname: req.body.lastName,
            email: req.body.email
        };

        parsedData.push(newUser);
        writeUsers(JSON.stringify(parsedData, null, 2));
    });

    //writes in to JSON file

    function writeUsers(updatedUsersList) {
        fs.writeFile('users.json', updatedUsersList, (err, data) => {
            if (err) throw err;
            console.log('Humans have been added!');
        })
    }
    /*Once that is complete, redirects to the route that displays all your users(from part 0).*/
    res.redirect('/users')
});




app.listen(port, () => console.log(`Got ears on ${port}`));