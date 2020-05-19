var columnClasses = [];
var currentVisibility;

const readFile = files => {
    var reader = new FileReader();
    reader.onload = getAsText;
    reader.readAsBinaryString(files[0]);
}

const getAsText = (event) => {
    
    
    var allTextLines = event.target.result.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');
    var tableRef = document.getElementById("output")

    tableRef.border = '1';
    var row = tableRef.insertAdjacentElement("beforeend", document.createElement("tr"));
    

    headers.map((header, index) => {
        columnClasses.push('col' + index);
        row.innerHTML += '<td class="col' + index + '" style="display:none">' + header + '</td>';
    });

    

    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length === headers.length) {
            var row = tableRef.insertAdjacentElement("beforeend", document.createElement("tr"));
            for (var j=0; j<headers.length; j++) {
                row.innerHTML += '<td class="col' + j + '" style="display:none">' + data[j] + '</td>';
            }
        }
    }

    columnClasses.slice(0,5).forEach(className => {
        var elements = document.getElementById('output').getElementsByClassName(className);
        for(var i = 0; i < elements.length; i++){
            elements.item(i).style.display = 'table-cell';
        }
    })
    currentVisibility = 0;

    
    var nextButton = tableRef.insertAdjacentElement("afterend", document.createElement("input"));
    nextButton.type = 'button';
    nextButton.value = "next";
    nextButton.onclick = () => next(5);

    var previousButton = tableRef.insertAdjacentElement("afterend", document.createElement("input"));
    previousButton.type = 'button';
    previousButton.value = "previous";
    previousButton.onclick = () => previous(5);
}

const next = (nextColumns) => {
    if( currentVisibility + nextColumns < columnClasses.length + nextColumns - 1){
        columnClasses.slice(currentVisibility, currentVisibility + nextColumns).forEach(className => {
            var elements = document.getElementById('output').getElementsByClassName(className);
            for(var i = 0; i < elements.length; i++){
                elements.item(i).style.display = 'none';
            }
        });
        currentVisibility += nextColumns;
        columnClasses.slice(currentVisibility, currentVisibility + nextColumns).forEach(className => {
            var elements = document.getElementById('output').getElementsByClassName(className);
            for(var i = 0; i < elements.length; i++){
                elements.item(i).style.display = 'table-cell';
            }
        });
    }
}

const previous = (previousColumns) => {
    if(currentVisibility - previousColumns  >= 0){
        columnClasses.slice(currentVisibility, currentVisibility + previousColumns).forEach(className => {
            var elements = document.getElementById('output').getElementsByClassName(className);
            for(var i = 0; i < elements.length; i++){
                elements.item(i).style.display = 'none';
            }
        });
        currentVisibility -= previousColumns;
        columnClasses.slice(currentVisibility, currentVisibility + previousColumns).forEach(className => {
            var elements = document.getElementById('output').getElementsByClassName(className);
            for(var i = 0; i < elements.length; i++){
                elements.item(i).style.display = 'table-cell';
            }   
        });
    }
}