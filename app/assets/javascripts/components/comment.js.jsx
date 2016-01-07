class Comment extends React.Component{

  render() {
    return (
      <div className="comment">
        <CommentBody comment={this.props.comment} />
        <CommentByline comment={this.props.comment} />
      </div>
    );
  }
}

class CommentBody extends React.Component{
  render() {
    return (
      <div className="comment-body">
        <span dangerouslySetInnerHTML={{__html: this.props.comment.body}} />
      </div>
    );
  }
}

class CommentByline extends React.Component{
  render() {
    return (
      <div className="comment-byline">
        By {this.props.comment.commenter} -- {this.props.comment.timestamp}
      </div>
    );
  }
}
