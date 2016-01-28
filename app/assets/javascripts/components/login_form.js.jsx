export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit() {
    this.props.onLogin(this.refs.email.value, this.refs.pwd.value, this.props.csrf_token);
  }
  render() {
    const loginForm = !this.props.user ?
    <div>
      <input type="email" className="form-control" ref="email" />
      <br/>
      <input type="password" className="form-control" ref="pwd" />
      <button className="btn btn-primary pull-right" onClick={this.handleSubmit}>Submit</button>
      <br />
    </div>
    :
      <p>Posting as {this.props.user.username}. Logout.</p>

  return (
    <div id="login-form">
      {loginForm}
    </div>
  );
  }
}
