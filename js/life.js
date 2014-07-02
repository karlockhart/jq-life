var gridSize = 0;
var numCells = 0;
var totalCells = 0;
var lastCell = 0;
var numRows = 0;

$(document).ready(function() {

  gridSize = $('#lifegrid').width();
  numCells = Math.floor(gridSize / 10);
  totalCells = numCells*numCells;
  lastCell = totalCells - 1;
  numRows = Math.floor(lastCell/numCells);

  for ( c = 0 ; c < (numCells * numCells) ; c++ ) {
	$('#lifegrid').append('<div class="lifecell" id="' + c + '"></div>');
  }

  $('.lifecell').on('click',  function () {
    $(this).addClass('alive');
  });

  $('#btn-step').on('click', function () {
    if (0 === $('.alive').length) {
      alert ('Click some boxes to give life a chance');
    }else {
      iterate();
    }
  });
});

function iterate(numCells) {
  var i = 0;
  var born = [];
  var died = [];
  
  $('.lifecell').each(function () {
    i++;
    var numNeighbors = countNeighbors($(this).attr('id'));
    
    if ($(this).hasClass('alive') && (numNeighbors < 2 || numNeighbors > 3)) {
      console.log('dying ' + $(this).attr('id'));
      died.push($(this).attr('id'));
    }else if(!$(this).hasClass('alive') && numNeighbors == 3) {
      console.log('born ' + $(this).attr('id'));
      born.push($(this).attr('id'));	
    }
    });
    
    console.log(born + ':born,died:' + died);
    
    
    $.each(born, function (index, value) {
      $('#'+value).addClass('alive');	
    }); 
    $.each(died, function (index, value) {
      $('#'+value).removeClass('alive');	
    });       
  
}

function countNeighbors(id) {
  var count = 0;

  id = parseInt(id);

  var neighborsInline = [(id-1), (id+1)];
  var neighborsAbove = [ (id-numCells), (id-(numCells-1)), (id-(numCells+1))];
  var neighborsBelow = [ (id+numCells), (id+(numCells-1)), (id+(numCells+1))];
  var neighbors = [];
 //@todo: this should be a function
  $.each(neighborsInline, function (index, value) {
    var row = Math.floor(id / numCells);
    if (value > 0 && value <= lastCell  && row  == Math.floor(value/numCells) && $('#'+value).hasClass('alive')) {
      neighbors.push(value);
      count += 1;
    }
    });
    
 //@todo: this should be a function
 $.each(neighborsAbove, function (index, value) {
    var row = Math.floor(id / numCells)-1;
    if (row >= 0 && value > 0 && value <= lastCell && row  == Math.floor(value/numCells) && $('#'+value).hasClass('alive')) {
      neighbors.push(value);
      count += 1;
    }
    });
 //@todo: this should be a function
 $.each(neighborsAbove, function (index, value) {
    var row = Math.floor(id/numCells)+1;

    if (row <= numRows  && value > 0 && value <= lastCell && row  == Math.floor(value/numCells) && $('#'+value).hasClass('alive')) {
      neighbors.push(value);
      count += 1;
    }
    });
    
    if (neighbors.length > 0){
      console.log(id + ':neighbors: ' + neighbors);
    }
    return neighbors.length;
}


