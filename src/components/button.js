import $ from 'jquery';

export default (text, clickFn) =>
  $('<button type="button" class="btn btn-primary"></button>')
    .text(text)
    .on('click', event => {
      event.preventDefault();
      event.stopPropagation();
      clickFn($(event.target));
    });
