# Basic MVC

Edit `db.js` and update the database configuration to suit your system. Then run the following commands in your terminal:

* `createdb tasklist`
* `node seed.js`

This creates the necessary tables and seeds them with some information.

Go to http://localhost:3000 and login with any of the following email addresses:

* `abc@abc.com`
* `xyz@xyz.com`
* `123@123.com`

The passwords have all been set to `1234`.

Observe how the greeting changes when you're logged in, and how the tasks displayed on the home page changes according to who's logged in.

## Things to Understand

Go through the contents of the files in this order:

* `index.js`
* `Routes.js`
* `ControllerUser.js`
* `ModelUser.js`
* `db.js`
* `ModelTask.js`
* ... then the `.jsx` files in the `views` folder.

Try to draw a diagram that shows how each of these files depend on the other files.

Observe how the callback functions in the controller, usually named `callback` here, are passed into the model functions so that the model can execute them after the database query results have been returned. Hence, although the callback functions are written in the controller here, they are actually executed in the models.

Observe how the routes are set up in `index.js` with the lines

```
const setupRoutesForTheExpressServer = require('./Routes');
setupRoutesForTheExpressServer(app);
```

The first line imported the function (of the same name) from the `Routes.js` file, and the second line ran that function with the express server as the argument, thereby adding the routes to the current express server.

# Exercise Your Understanding

If you think you've gotten a grasp on how the information flows within this app, try the following:

1. Add a form with a single text input and submit button to `Home.jsx` that displays only when the user is logged in. This form should allow the logged in user to create a task and submit it. The form should submit the task to `/tasks` via a `POST` request.

2. Add a `ControllerTasks.js` file. This file should contain a function that handles `POST` requests to `/tasks`, by calling on the appropriate function from `ModelTask.js` to create the task for the currently logged in user. Remember to assign the task to the user after creating it! All the functions you need for this route should already exist in the relevant models.

3. Wire up your `ControllerTasks.js` file to `Routes.js`, and make sure that `Routes.js` gets the express server to listen for `POST` requests at `/tasks`.

# For Further Learning

Once you're comfortable adding routes to the above exercise, here's a list of things you can choose to learn and work on.

0. Move the controllers and models into appropriate folders to keep the root folder as clutter-free as possible. Make sure your app still works after that!

1. Pick up and use a CSS framework to style the views. Bootstrap knowledge is a must, but if you're already familiar with it, try Materialize or Semantic UI.

2. Having to export `Routes.js` as a function and pass in the express server as an argument is a little hackish, i.e. it works, but it doesn't seem to be using tools the way they're intended to be used. To remedy this, look into the use of the `express-router` package. This package allows you to compartmentalize your site's routes and keep them organized nicely.

3. User authentication via cookies is not particularly secure. For example, one can simply edit the `login` cookie in the browser and change his login status or even assume the identity of another user.
    - You can improve the security of the cookie by using `express-session` and setting the secured cookies and http-only option to true. The second option prevents browser-side javascript from manipulating your cookies.
    - Implement salting of your user's passwords. Right now, if someone had access to your list of stored passwords, it is possible to analyze the frequencies of the encrypted passwords and check them against known lists of common passwords. For example, if `asdjlfgjhsdfgsdjhk` occurs the most frequently in your database of passwords, there's a rather high chance that those users' passwords are simply `password`! Prepend a random string, the salt, to your user's password before it is encrypted and saved. Store that string in the database along with his user id. When checking for user authentication, retrieve the salt and prepend it to the user's entered password before encrypting it for comparison with the database's encrypted password.
    - (Hard) Prevent the page from refreshing when the user logs in, and instead submit the form data using an AJAX call. You'll have to look into setting the `withCredentials` option for your AJAX request to `true` in order to get the login cookie back.

4. The user registration form at http://localhost:3000/users/register could use some work. Aside from some built-in HTML5 functions that try to check if you've provided a valid address, there's no other validation being done. A user could submit a blank password or name and that would be passed along to the database. You'll ideally want the user's name and email address to look sensible, and the password to be of a minimum length. Look into the use of the `express-validator` package to validate client-side forms.

5. Make the app robust. Test it. If you try to login now with a user that does not exist, the server will throw an error and crash. If you try to access a route that does not exist, bad things will happen as well. In practice, your apps expected to fail gracefully, i.e. instead of crashing, fallback on something else, or if an appropriate fallback cannot be determined, display an error and hopefully a course of action that the user can take. For example, if the user tries to access a route that does not exist, you can either display a 404 error or redirect the user to the homepage (which is better?). Probe the app for possible failure points and handle them.