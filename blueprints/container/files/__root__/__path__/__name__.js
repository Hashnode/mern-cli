/* eslint no-unused-vars:0 */
import React, { PropTypes, Component } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions/actions';

class <%= entity.name %> extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <Header />
        <Footer />
      </div>
    );
  }
}

<%= entity.name %>.contextTypes = {
  router: React.PropTypes.object,
};

function mapStateToProps(store) {
  return {
  };
}

<%= entity.name %>.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(<%= entity.name %>);
