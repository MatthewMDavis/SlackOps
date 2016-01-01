var CommentsList = React.createClass ({
  render: function() {
    var comments = this.props.comments.map(function(comment) {
      return <Comment key={comment.id} comment={comment} />;
    });

    return (
      <div className="comments">
        {comments}
      </div>
    );
  }
});
