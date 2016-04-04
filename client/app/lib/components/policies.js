export function userOwnsComment (user, comment) {
  return user.username === comment.commenter;
}

export function userIsAdmin(user) {
  return user.role === 'admin';
}

export function userOwnsArticle(user, articleAuthor) {
  return user.role === 'editor' && user.username === articleAuthor;
}

export default function userMayDelete(user, comment, articleAuthor) {
  if (userOwnsComment(user, comment) || userOwnsArticle(user, articleAuthor) || userIsAdmin(user)) {
    return 'You may delete this comment.'
  }
}
