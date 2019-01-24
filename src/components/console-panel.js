import $ from 'jquery';

export default (id = 'console', rows = 25) => {
  const $console = $(`
    <div class="form-group">
      <button id="clearConsole" type="button" class="btn btn-secondary btn-sm float-right">Clear</button> <label for="${id}" class="control-label">Console:</label>
      <textarea class="form-control" id="${id}" rows="${rows}" readonly></textarea>
    </div>`);

  $('#clearConsole', $console).on('click', () => $(`#${id}`).val(''));

  return $console;
};
