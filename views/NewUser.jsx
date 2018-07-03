var React = require("react");

class Home extends React.Component {
  render() {
    // If the user is not logged in, display the login form.
    // If the user is logged in, display his name, his tasks, and a logout button.
    return (
      <html>
        <head />
        <body>
          <h1>Hello there</h1>
            <form method="POST" action="/users/new">
                Name: <input name="name" type="text" /><br/>
                Email: <input name="email" type="email" /><br/>
                Password:<input name="password" type="password" /><br/>
                <input type="submit" value="Sign Up" /><br/>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = Home;