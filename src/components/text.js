import $ from 'jquery';

export default (id, label, required) =>
  $(`
  <div class="form-group">
  <label class="form-control-label" for="${id}">${label}</label>
  <input type="text" id="${id}" name="${id}" class="form-control" ${required ? 'required' : ''} />
  <div class="invalid-feedback">Field is required.</div>
  </div>
`);
