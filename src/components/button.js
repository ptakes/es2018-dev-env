import $ from 'jquery';

export default (text, clickFn, type = 'primary') =>
  $(`<button type="button" class="btn btn-${type}"></button>`)
    .text(text)
    .on('click', event => {
      event.preventDefault();
      event.stopPropagation();
      clickFn();
    });
