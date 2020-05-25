function loadlistview(type){
    

    window.location.href="/alpha/listview.html" + "?type=" + type;
}

function loaddata(){
    let params = new URLSearchParams(window.location.search);
    const type = params.get("type");
    let url = "/alpha" + "/" + type + "list.svc";
    fetch(url).then((res)=>{
        if(res.status !==200){
            return {"error":"status 200"};
        }
        else{
            return res.json()
        }
    }).then((dataset)=>{
        document.getElementById('content').innerHTML = dataSet2Grid(dataset);
    })
}

function dataSet2Grid(dataset){
    let table = "";
    const tableBegin = "<table>";
    const tableEnd = "</table>";
    const rowBegin = "<tr>";
    const rowEnd = "</tr>";
    const headerBegin = "<th>";
    const headerEnd = "</th>";
    const cellBegin = "<td>";
    const cellEnd = "</td>";

    table = tableBegin;
    //add header
    table += rowBegin;
    dataset.metadata.forEach((meta)=>{
        table +=  headerBegin + meta.colName + headerEnd;
    });
    table += rowEnd;
    
    //add rows
    for(rows in dataset.datatable){
        table += rowBegin;
        for(col in dataset.datatable[rows]){
            table += cellBegin + dataset.datatable[rows][col].value + cellEnd;
        }
        table += rowEnd;
    }

    table += tableEnd;

    return table;
}