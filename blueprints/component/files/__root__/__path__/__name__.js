/* eslint no-unused-vars: 0 */
/* eslint-disable prefer-template*/
import React, { PropTypes, Component } from 'react';

const <%= entity.name %> = () => {
}

<%= entity.name %>.propTypes = {
<% for (var key in props) { %>  <%= key %>: React.PropTypes.<%= props[key] %>,
<% } %>};

export default <%= entity.name %>;
