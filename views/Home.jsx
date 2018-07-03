var React = require("react");

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
    let tasks = [];
    if (this.props.name) {
      tasks = this.props.tasks.map(entry => <li>{entry.task}</li>);
    };
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