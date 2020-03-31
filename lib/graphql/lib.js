"use strict";

exports.makeRequest = function (_ref) {
  var query = _ref.query,
      _ref$variables = _ref.variables,
      variables = _ref$variables === void 0 ? {} : _ref$variables,
      name = _ref.name,
      _ref$method = _ref.method,
      method = _ref$method === void 0 ? 'POST' : _ref$method;
  return fetch('/graphql', {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      query: query,
      variables: variables
    })
  }).then(function (res) {
    return res.json();
  }).then(function (result) {
    console.log("%c SUCCESS", 'color: green');
    return result.data;
  })["catch"](function (error) {
    console.log("%c ERROR", 'color: red', error);
  });
};