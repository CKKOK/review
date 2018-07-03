var React = require("react");

// This login form will be rendered only if the user is not logged in. Because it's a fairly large component (relatively speaking), I've chosen to extract it as its own component rather than embed it in the home component.
class LoginForm extends React.Component {
  render() {
    return(
      <form action="/users/login" method="POST">
        Email: <input name="email" type="email"/><br/>
        Password: <input name="password" type="password"/><br/>
        <input type="submit" value="Login"/><br/>
      </form>
    )
  }
}

class Home extends React.Component {
  render() {
    // If the user is not logged in, display the login form.
    // If the user is logged in, display his name, his tasks, and a logout button.

    // If the user is logged in, our controller/index.js will pass in a name as part of this.props (it's that object that's in the 2nd parameter of the response.render function). We use that to detect whether the user is logged in or not here. If the user is logged in, tasks would have been passed in here as well. That is in the form [{task: 'some task'}, {task: 'another task'}]. So we map each of the task objects into list elements.
    let tasks = [];
    if (this.props.name) {
      tasks = this.props.tasks.map(entry => <li>{entry.task}</li>);
    };

    // You'll see that I use ternary operators quite often in components below. That's because mixing up JS and HTML in such close proximity makes for really bad readability. This is one instance where you really don't want your JS code to be any longer than is absolutely needed, so no if-else statements if possible!
    return (
      <html>
        <head />
        <body>
          <h1>Hello there{this.props.name ? ', ' + this.props.name : ''}</h1>
          {!this.props.name ? <a href='/users/register'>Register<br/></a> : ''}
          {!this.props.name ? <LoginForm /> : <a href='/users/logout'>Logout</a>}
          {!this.props.name ? '' : <ul>{tasks}</ul>}
        </body>
      </html>
    );
  }
}

module.exports = Home;