class CommentsList extends React.Component{
  constructor() {
    super();
  }
  render() {
    let comments = this.props.comments.map(function(comment) {
      return <Comment key={comment.id} comment={comment} />;
    });

    return (
      <div className="comments">
        {comments}
      </div>
    );
  }
}
