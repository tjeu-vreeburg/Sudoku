var array;
var arrayCurrent;
var table;
var required;

$(document).ready(() => {
  $('#easy').click(() => array = create("Easy", "success", 0.4));
  $('#medium').click(() => array = create("Medium", "primary", 0.5));
  $('#hard').click(() => array = create("Hard", "danger", 0.6));

  $('#solve').click(() => {
    solve(array);
    updateGrid();
    $('.progress-bar').width(100 + "%");
  });

  $('#back').click(() => {
    $('.game').toggle();
    $('.setup').toggle();
  });
});

function create(type, badge, difficulty) {
  array = generate(difficulty);
  table = document.getElementById('sudoku');

  $("#" + table.id).empty();
  $("#difficulty").html("SUDOKU <span class=\"badge badge-" + badge + "\">" + type + "</span>");
  $(".progress").html("<div class=\"progress-bar progress-bar-striped progress-bar-animated bg-" + badge + "\" role=\"progressbar\"></div>");

  required = setupGrid();
  updateGrid();

  $('.progress-bar').width(0 + "%");
  $('.game').toggle();
  $('.setup').toggle();
  return array;
}

function setupGrid() {
  var amount = 0;

  for(var i = 0; i < array.length; i++) {
    $("#" + table.id).append($("<tr id=row-" + i + "></tr>"));
    for(var j = 0; j < array.length; j++) {
      var element = $("#row-" + i);
      var value = array[i][j];

      if(value == null) {
        amount += 1;
        element.append($("<td><input type=\"text\" id=\"fname\" name=\"fname\" value=\"" + array[i][j] + "\" onchange=\"checkRegex(this.value, this)\" maxlength=\"1\"y></td>"));
      } else {
        element.append($("<td id=\"light-grey\"><input type=\"text\" id=\"fname\" class=\"static-td\" name=\"fname\" value=\"" + array[i][j] + "\" onchange=\"checkRegex(this.value, this)\" maxlength=\"1\"readonly></td>"));
      }
    }
  }
  return amount;
}

function checkRegex(value, element) {
  element.value = new RegExp('[0-9]').test(value) ? value : null;

  updateArray();
  $('.progress-bar').width(emptySpace() / required * 100 + "%");
}

function emptySpace() {
  var amount = required;
  for (var x = 0; x < arrayCurrent.length; x++) {
    for (var y = 0; y < arrayCurrent.length; y++) {
      if(arrayCurrent[x][y] == null) amount -= 1;
    }
  }
  return amount;
}

function updateArray() {
  arrayCurrent = [];
  var rows = table.childNodes;
  for (var x = 0; x < array.length; x++) {
    arrayCurrent[x] = [];
    var columns = rows[x].childNodes;
    for (var y = 0; y < array.length; y++) {
      var value = columns[y].childNodes[0].value;
      arrayCurrent[x][y] = new RegExp('[0-9]').test(value) ? value : null;
    }
  }
}

function updateGrid() {
  var rows = table.childNodes;
  for (var x = 0; x < array.length; x++) {
    var columns = rows[x].childNodes;
    for (var y = 0; y < array.length; y++) {
      columns[y].childNodes[0].value = array[x][y];
    }
  }
}
