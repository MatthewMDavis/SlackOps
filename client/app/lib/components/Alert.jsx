import React, { PropTypes, Component } from 'react';
import { Alert } from 'react-bootstrap';
import Immutable from 'immutable';
import { startCase } from 'lodash';

export default class AuthAlert extends Component {
  static propTypes = {
    errorCollection: PropTypes.instanceOf(Immutable.Map)
  };

  constructor(props) {
    super(props);
  }

  errCollection(errObject) {
    const errList = [];
    for (let [category, details] of errObject)         {
      const detailArray = details.toArray();
      errList.push(
        <div key={category}>
          {startCase(category)}: {detailArray.join(', ')}
        </div>
      );
    }
    return errList;
  }

  render() {
    return(
      <Alert bsStyle="danger">
        {this.errCollection(this.props.errorCollection)}
      </Alert>
    );
  }

}
