class CommentsBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { comments, user, article_id } = this.props;
    this.fetchComments = this.fetchComments.bind(this)
    this.commentSubmit = this.commentSubmit.bind(this)
  }

  commentSubmit(text) {

    const payload = {
      comment: {
        article_id: this.state.article_id,
        user_id: this.state.user.id,
        body: text
      }
    };

    post(`/articles/12/comments`, payload)
      .then(json=>{
        this.fetchComments();
      });

  }

  componentDidMount() {
    this.interval = setInterval(this.fetchComments, 20 * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  fetchComments() {
    get(`/articles/${this.props.article_id}/comments`)
      .then(json=>{
        this.setState({ comments: json });
      });
  }



  render() {
    const { comments, user } = this.state;
    return (
      <div className="commentsBox">
        <CommentsList comments={comments} />
        <CommentForm user={user} onComment={this.commentSubmit}/>
      </div>
    );
  }

}
