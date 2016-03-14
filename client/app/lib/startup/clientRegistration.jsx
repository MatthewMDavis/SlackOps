import ReactOnRails from 'react-on-rails';
import RGBlog from 'lib/store/rgblogStore';
import AuthApp from './AuthAppClient';
// This is how react_on_rails can see the RGBlog in the browser.
ReactOnRails.registerStore({ RGBlog });
ReactOnRails.register({ AuthApp })
