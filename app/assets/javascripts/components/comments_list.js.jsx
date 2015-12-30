var CommentsList = React.createClass ({

  getInitialState: function() {
    initialComments = this.props.comments
    return { comments: initialComments };
  },

  render: function() {
    var comments = this.state.comments.map(function(comment) {
      // return <Comment key={comment.id} comment={comment} commenter={comment.commenter} body={comment.body} created_at={comment.created_at}/>;
      return <Comment key={comment.id} comment={comment} />;
    });

    return (
      <div className="comments">
        {comments}
      </div>
    );
  }
});
