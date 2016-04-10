export function userOwnsComment (user, comment) {
  return user.username === comment.commenter;
}

export function userIsAdmin(user) {
  return user.role === 'admin';
}

export function userOwnsArticle(user, articleAuthor) {
  return user.role === 'editor' && user.username === articleAuthor;
}

export function commentIsFresh(comment) {
  const createdAt = Date.parse(comment.timestamp);
  const currTime = new Date();
  if (currTime - createdAt <= 300000) return true;
}

export function coolingOff(user, comment) {
  if (userOwnsComment(user, comment) && commentIsFresh(comment)) return true;
}

export function userMayDelete(user, comment, articleAuthor) {
  if (!user) return false;
  if (coolingOff(user, comment) || userOwnsArticle(user, articleAuthor) || userIsAdmin(user)) {
    return true;
  }
}
