import $ from 'jquery';

export default (text, type = 'primary') => $(`<div class="alert alert-${type}" role="alert"></div>`).text(text);
