import mirrorCreator from 'mirror-creator';

const actionTypes = mirrorCreator([
  'COMMENTS_UPDATE',
  'COMMENT_PENDING',
  'COMMENT_SUCCESS',
  'COMMENT_ERROR',
  'USER_COMMENT_CHANGE'
]);

export default actionTypes;
