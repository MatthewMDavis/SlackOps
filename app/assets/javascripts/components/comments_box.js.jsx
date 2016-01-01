var CommentsBox = React.createClass ({
  getInitialState: function() {
    var initialComments = this.props.comments;
    return { comments: initialComments };
  },

  render: function() {
    return <CommentsList comments={this.state.comments} />;
  }

});
