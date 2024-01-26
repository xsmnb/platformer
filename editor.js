function generateTable() {
    var height = document.getElementById('height').value;
    var width = document.getElementById('width').value;

    var table = '<table>';
    for (var i = 0; i < height; i++) {
        table += '<tr>';
        for (var j = 0; j < width; j++) {
            table += '<td><select id="cell-' + i + '-' + j + '">' +
                        '<option value="0">Air</option>' +
                        '<option value="1">Wall</option>' +
                        '<option value="2">Player</option>' +
                        '<option value="3">Sand</option>' +
                        '<option value="4">Goal</option>' +
                        '<option value="5">Background Wall</option>' +
                        '<option value="6">Falling Block</option>' +
                        '<option value="7">Disappearing Block</option>' +
                        '<option value="8">Moving Block Start</option>' +
                        '<option value="9">Moving Block End</option>' +
                    '</select></td>';
        }
        table += '</tr>';
    }
    table += '</table>';

    document.getElementById('tableContainer').innerHTML = table;
}
function generateJs(){
    var height = document.getElementById('height').value;
    var width = document.getElementById('width').value;
    var js = 'gameArr = [';
    for (var i = 0; i < height; i++) {
        js += '[';
        for (var j = 0; j < width; j++) {
            js += `${document.getElementById('cell-'+i+'-'+j).value},`;
        }
        js += '],';
    }
    js += '];';
    document.getElementById('jsContainer').innerHTML = js;  
}