var Comment = React.createClass({

  render: function() {
    return (
      <div className="comment">
        <CommentBody comment={this.props.comment} />
        <CommentByline comment={this.props.comment} />
      </div>
    );
  }
});

var CommentBody = React.createClass({
  render: function() {
    return (
      <div className="comment-body">
        <span dangerouslySetInnerHTML={{__html: this.props.comment.body}} />
      </div>
    );
  }
});

var CommentByline = React.createClass({
  render: function() {
    return (
      <div className="comment-byline">
        By {this.props.comment.commenter} at {this.props.comment.created_at}
      </div>
    );
  }
});

