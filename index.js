console.log("loading index.js...");
let filename = "";

function Export2Doc(event,element) {
    event.preventDefault();
    var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
    var postHtml = "</body></html>";
    var html = preHtml + document.getElementById(element).innerHTML + postHtml;

    var blob = new Blob(['\ufeff', html], {
        type: 'application/msword'
    });
    var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);
    var downloadLink = document.createElement("a");
    document.body.appendChild(downloadLink);

    if (navigator.msSaveOrOpenBlob) {
        navigator.msSaveOrOpenBlob(blob, filename);
    } else {
        downloadLink.href = url;
        downloadLink.download = filename;
        downloadLink.click();
    }

    document.body.removeChild(downloadLink);
}

function formListener(event) {

    switch (event.target.name) {
        case "ticketNumber":
            handleTitle(event);
            break;
        case "releaseVersion":
            handleTitle(event);
            break;
        case "enviornmentTypeList":
            handleTitle(event);
            break;
        case "datamartList":
            handleTitle(event);
            break;
        case "newSquencesJobs":
            handleNewETL(event);
            break;
        case "alteredSquencesJobs":
            handleAlteredETL(event);
            break;
        case "ddlsCreated":
            handleNewDDLS(event);
            break; 
        case "ddlsAltered":
            handleAlteredDDLS(event);
            break;                       
        default:
            console.log(event.target.value);
    }
}

function handleNewETL(event){
    let newSquencesJobs = document.getElementById("newSquencesJobs").value.split(", ");
    /* ETL Migration Summary */
    document.getElementById("newETLS").innerHTML = "";
    for (let job in newSquencesJobs){
        let listItem = document.createElement("li");
        listItem.innerHTML = newSquencesJobs[job] + " (NEW)";
        document.getElementById("newETLS").appendChild(listItem);
    }
}

function handleAlteredETL(event){
    let alteredSquencesJobs = document.getElementById("alteredSquencesJobs").value.split(", ");
   
    /* ETL Migration Summary */
    document.getElementById("alteredETLS").innerHTML = "";
    for (let job in alteredSquencesJobs){
        let listItem = document.createElement("li");
        listItem.innerHTML = alteredSquencesJobs[job] + " (ALTERED)";
        document.getElementById("alteredETLS").appendChild(listItem);
    }  
}

function handleNewDDLS(event){
    let ddlsCreated = document.getElementById("ddlsCreated").value.split(", ");
   
    /* ETL Migration Summary */
    document.getElementById("newDDLS").innerHTML = "";
    for (let ddl in ddlsCreated){
        let listItem = document.createElement("li");
        listItem.innerHTML = ddlsCreated[ddl] + " (NEW)";
        document.getElementById("newDDLS").appendChild(listItem);
    }  
}

function handleAlteredDDLS(event){
    let ddlsAltered = document.getElementById("ddlsAltered").value.split(", ");
   
    /* ETL Migration Summary */
    document.getElementById("alteredDDLS").innerHTML = "";
    for (let ddl in ddlsAltered){
        let listItem = document.createElement("li");
        listItem.innerHTML = ddlsAltered[ddl] + " (ALTERED)";
        document.getElementById("alteredDDLS").appendChild(listItem);
    }  
}


function handleTitle(event) {

    let ticketNumber = document.getElementById("ticketNumber").value;
    let releaseVersion = document.getElementById("releaseVersion").value;
    let server = "";
    let datamart = document.getElementById("datamartList").value;
    let enviornmentType = document.getElementById("enviornmentTypeList").value;
    console.log(enviornmentType);

    if (enviornmentType==="DEV"){
        server = "ERADS11"
    } else if (enviornmentType==="TST"){
        server = "ERADS12"
    } else if (enviornmentType==="PRD") {
        server = "ERADS13"
    }
    
    console.log(server);

    /* Part 1 */
    /* Migrate Points */
    document.getElementById("ddlMigrateOne").innerHTML = "Back up view PS_D_DEPT_NU to \\FFRA\\trunk\\Releases\\" + releaseVersion + "\\backup PS_D_DEPT_NU.sql";
    document.getElementById("ddlMigrateTwo").innerHTML = "Back up view PS_F_KK_LEDGER_NU \\FFRA\\trunk\\Releases\\" + releaseVersion + "\\backup PS_F_KK_LEDGER_NU.sql";

    /* Execute Points */
    document.getElementById("executeOne").innerHTML = "Open \\FFRA\\trunk\\Releases\\" + releaseVersion + "\\import SQLScript.sql";

    /* Part 2 */
    /* Titles */
    document.getElementById("backupPre").innerHTML = "<b>Back up entire Batch_" + datamart + " (pre migration)</b>";
    document.getElementById("migrateDsx").innerHTML = "<b>Migrate DSX to " + datamart + "_" + enviornmentType + "</b>";
    document.getElementById("backupPost").innerHTML = "<b>Back up entire Batch_" + datamart + " (post migration)</b>";

    /* Pre Backup Bullet Points */
    document.getElementById("backupOne").innerHTML = "Open DS Designer and log on to " + datamart + "_" + enviornmentType + " on " + server;
    document.getElementById("backupTwo").innerHTML = "Export Batch_" + datamart + ", with executables, exclude read-only to \\FFRA\\trunk\\Releases\\" + releaseVersion + "\\backup  Batch_" + datamart + "_" + enviornmentType + "_Pre.dsx";
    document.getElementById("backupThree").innerHTML = "Commit to SVN with comment \"" + datamart + " " + releaseVersion + " to " + enviornmentType + " before migration\"";

    /* Migrate Bullet Points */
    document.getElementById("migrateOne").innerHTML = "Open DS Designer and log on to " + datamart + "_" + enviornmentType + " on " + server;
    document.getElementById("migrateTwo").innerHTML = "Import the file already saved to subversion: \\FFRA\\trunk\\Releases\\" + releaseVersion + "\\import  " + datamart + "_" + enviornmentType + "_" + releaseVersion + ".dsx";
    document.getElementById("migrateThree").innerHTML = "Compile job (Tools -> Multiple Job Compile (All Jobs)";

    /* Post Backup Bullet Points */
    document.getElementById("backupFour").innerHTML = "Export Batch_" + datamart + ", with executables, exclude read-only to \\FFRA\\trunk\\Releases\\" + releaseVersion + "\\backup  Batch_" + datamart + "_" + enviornmentType + "_Post.dsx";
    document.getElementById("backupFive").innerHTML = "Commit to SVN with comment \"" + datamart + " " + releaseVersion + " to " + enviornmentType + " after migration\"";
    document.getElementById("backupSix").innerHTML = "Close DS Designer connection to " + datamart + "_" + enviornmentType + " on " + server;

    /* Set Title and File Name */
    console.log(enviornmentType);
    let title = datamart + "_" + enviornmentType + " " + releaseVersion + " Migration Script (" + ticketNumber + ")";
    filename = title + ".doc";
    document.getElementById("docTitle").innerHTML = title;
}