import Comment from '../components/Comment'

export default class CommentsList extends React.Component{
  constructor() {
    super();
  }
  render() {
    const { comments } = this.props;
    const renderComments = comments.map(comment=>{
      return <Comment key={comment.id} comment={comment} />;
    });

    return (
      <div className="comments">
        {renderComments}
      </div>
    );
  }
}
