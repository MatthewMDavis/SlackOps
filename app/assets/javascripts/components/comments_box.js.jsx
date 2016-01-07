class CommentsBox extends React.Component {
  constructor(props) {
    super(props);
    initialComments = this.props;
    this.state = initialComments;
  }

  render() {
    return <CommentsList comments={this.state.comments} />;
  }

}
