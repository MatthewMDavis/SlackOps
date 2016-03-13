import ReactOnRails from 'react-on-rails';
import CommentsApp from './CommentsAppClient';

// This is how react_on_rails can see the CommentsBox in the browser.
ReactOnRails.register({ CommentsApp });
