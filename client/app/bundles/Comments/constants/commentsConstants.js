import mirrorCreator from 'mirror-creator';

const actionTypes = mirrorCreator([
  'UPDATE_COMMENTS',
  'FETCHING_COMMENTS',
  'COMMENT_DELETE_PENDING',
  'COMMENT_PENDING',
  'COMMENT_SUCCESS',
  'COMMENT_ERROR',
  'USER_COMMENT_CHANGE'
]);

export default actionTypes;
