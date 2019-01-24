import $ from 'jquery';
import image from '../images/logo.svg';

export default (height = 50, width = 50, text = '') =>
  $(`<img height="${height}" width="${width}">`)
    .attr('alt', text)
    .attr('src', image);
