console.log("loading index.js...");
let filename = "";

function isDDLEmpty() {
    let newDDLS = document.getElementById("ddlsCreated").value
    let alteredDDLS = document.getElementById("ddlsAltered").value
    if (newDDLS == "" && alteredDDLS == "") {
        document.getElementById("migrateDDL").style.display = "none";
    } else {
        document.getElementById("migrateDDL").style.display = "block";
    }
}
function isETLEmpty() {
    let newETLS = document.getElementById("newSquencesJobs").value
    let alteredETLS = document.getElementById("alteredSquencesJobs").value
    if (newETLS == "" && alteredETLS == "") {
        document.getElementById("migrateDataStageETL").style.display = "none";
    } else {
        document.getElementById("migrateDataStageETL").style.display = "block";
    }
}
function isSpecialInstructionsEmpty() {
    let specialInstructions = document.getElementById("specialInstructions").value
    if (specialInstructions == "") {
        document.getElementById("specialInstructionsSection").style.display = "none";
    } else {
        document.getElementById("specialInstructionsSection").style.display = "block";
    }
}
function isVariableEmpty() {
    let newVariables = document.getElementById("environmentVariablesNew").value
    let alteredVariables = document.getElementById("environmentVariablesAltered").value
    if (newVariables == "" && alteredVariables == "") {
        document.getElementById("migrateEnvironmentVariables").style.display = "none";
    } else {
        document.getElementById("migrateEnvironmentVariables").style.display = "block";
    }
}


isDDLEmpty();
isETLEmpty();
isSpecialInstructionsEmpty();
isVariableEmpty();

function Export2Doc(event, element) {
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
    isDDLEmpty();
    isETLEmpty();
    isSpecialInstructionsEmpty();
    isVariableEmpty();

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
        case "specialInstructions":
            handleSpecialInstructions(event);
            break;
        case "environmentVariablesNew":
            handleEnvironmentVariablesNew(event);
            break;
        case "environmentVariablesAltered":
            handleEnvironmentVariablesAltered(event);
            break;
        default:
            console.log(event.target.value);
    }
}

function handleEnvironmentVariablesNew(event) {
    let environmentVariables = document.getElementById("environmentVariablesNew").value.split("\n");

    document.getElementById("environmentVariablesList").innerHTML = "";
    if (environmentVariables != "") {
        for (let variable in environmentVariables) {
            let listItem = document.createElement("li");
            listItem.innerHTML = environmentVariables[variable];
            document.getElementById("environmentVariablesList").appendChild(listItem);
        }
    } else {
        let listItem = document.createElement("li");
        listItem.innerHTML = "NONE";
        document.getElementById("environmentVariablesList").appendChild(listItem);
    }
}

function handleEnvironmentVariablesAltered(event) {
    let environmentVariables = document.getElementById("environmentVariablesAltered").value.split("\n");

    document.getElementById("environmentVariablesList2").innerHTML = "";
    if (environmentVariables != "") {
        for (let variable in environmentVariables) {
            let listItem = document.createElement("li");
            listItem.innerHTML = environmentVariables[variable];
            document.getElementById("environmentVariablesList2").appendChild(listItem);
        }
    } else {
        let listItem = document.createElement("li");
        listItem.innerHTML = "NONE";
        document.getElementById("environmentVariablesList2").appendChild(listItem);
    }
}

function handleNewETL(event) {
    let newSquencesJobs = document.getElementById("newSquencesJobs").value.split("\n");

    document.getElementById("newETLS").innerHTML = "";
    if (newSquencesJobs != "") {
        for (let job in newSquencesJobs) {
            let listItem = document.createElement("li");
            listItem.innerHTML = newSquencesJobs[job];
            document.getElementById("newETLS").appendChild(listItem);
        }
    } else {
        let listItem = document.createElement("li");
        listItem.innerHTML = "NONE";
        document.getElementById("newETLS").appendChild(listItem);
    }
}

function handleAlteredETL(event) {
    let alteredSquencesJobs = document.getElementById("alteredSquencesJobs").value.split("\n");

    document.getElementById("alteredETLS").innerHTML = "";
    if (alteredSquencesJobs != "") {
        for (let job in alteredSquencesJobs) {
            let listItem = document.createElement("li");
            listItem.innerHTML = alteredSquencesJobs[job];
            document.getElementById("alteredETLS").appendChild(listItem);
        }
    } else {
        let listItem = document.createElement("li");
        listItem.innerHTML = "NONE";
        document.getElementById("alteredETLS").appendChild(listItem);
    }
}

function handleNewDDLS(event) {
    let ddlsCreated = document.getElementById("ddlsCreated").value.split("\n");

    document.getElementById("newDDLS").innerHTML = "";
    if (ddlsCreated != "") {
        for (let ddl in ddlsCreated) {
            let listItem = document.createElement("li");
            listItem.innerHTML = ddlsCreated[ddl];
            document.getElementById("newDDLS").appendChild(listItem);
        }
    } else {
        let listItem = document.createElement("li");
        listItem.innerHTML = "NONE";
        document.getElementById("newDDLS").appendChild(listItem);
    }
}

function handleAlteredDDLS(event) {
    let ddlsAltered = document.getElementById("ddlsAltered").value.split("\n");

    document.getElementById("alteredDDLS").innerHTML = "";
    document.getElementById("ddlsMigration").innerHTML = "";
    if (ddlsAltered != "") {
        for (let ddl in ddlsAltered) {
            let listItem = document.createElement("li");
            listItem.innerHTML = ddlsAltered[ddl];
            document.getElementById("alteredDDLS").appendChild(listItem);
            listItem = document.createElement("li");
            listItem.innerHTML = ddlsAltered[ddl];
            document.getElementById("ddlsMigration").appendChild(listItem);
        }
    } else {
        let listItem = document.createElement("li");
        listItem.innerHTML = "NONE";
        document.getElementById("alteredDDLS").appendChild(listItem);
        listItem = document.createElement("li");
        document.getElementById("ddlsMigration").innerHTML = "";
    }
}

function handleSpecialInstructions(event) {
    let specialInstructions = document.getElementById("specialInstructions").value;
    document.getElementById("specialInstructionsDoc").innerHTML = specialInstructions;
}



function handleTitle(event) {

    let ticketNumber = document.getElementById("ticketNumber").value;
    let releaseVersion = document.getElementById("releaseVersion").value;
    let server = "";
    let datamart = document.getElementById("datamartList").value;
    let enviornmentType = document.getElementById("enviornmentTypeList").value;


    if (enviornmentType === "TST") {
        server = "ERADS12"
    } else if (enviornmentType === "PRD") {
        server = "ERADS13"
    }

    let svnurl = "\\ERA\\trunk\\Releases\\" + datamart + "\\" + releaseVersion + "\\";

    /* Set Title and File Name */
    let title = datamart + "_" + enviornmentType + " " + releaseVersion + " Migration Script (" + ticketNumber + ")";
    filename = title + ".doc";
    document.getElementById("docTitle").innerHTML = title;

    /* Migrate Points */
    document.getElementById("ddlsMigrationP").innerHTML = "Back up the DDLS listed below to " + svnurl + "backup\\{ DDLName }.sql";

    /* Execute SQL Point */
    document.getElementById("executeOne").innerHTML = "Open \\ERA\\trunk\\Releases\\" + datamart + "\\" + releaseVersion + "\\import SQLScript.sql";

    /* Backups */
    document.getElementById("backupPre").innerHTML = "<b>Back up entire Batch_" + datamart + " (pre migration)</b>";
    document.getElementById("migrateDsx").innerHTML = "<b>Migrate DSX to " + datamart + "_" + enviornmentType + "</b>";
    document.getElementById("backupPost").innerHTML = "<b>Back up entire Batch_" + datamart + " (post migration)</b>";

    /* Pre Backup Bullet Points */
    document.getElementById("backupOne").innerHTML = "Open DS Designer and log on to " + datamart + "_" + enviornmentType + " on " + server;
    document.getElementById("backupTwo").innerHTML = "Export Batch_" + datamart + ", with executables, exclude read-only to \\ERA\\trunk\\Releases\\" + datamart + "\\" + releaseVersion + "\\backup\\Batch_" + datamart + "_" + enviornmentType + "_Pre.dsx";
    document.getElementById("backupThree").innerHTML = "Commit to SVN with comment \"" + datamart + " " + releaseVersion + " to " + enviornmentType + " before migration\"";

    /* Migrate Bullet Points */
    document.getElementById("migrateOne").innerHTML = "Open DS Designer and log on to " + datamart + "_" + enviornmentType + " on " + server;
    document.getElementById("migrateTwo").innerHTML = "Import the file already saved to subversion: \\ERA\\trunk\\Releases\\" + datamart + "\\" + releaseVersion + "\\import\\" + datamart + "_" + enviornmentType + "_" + releaseVersion + ".dsx";
    document.getElementById("migrateThree").innerHTML = "Compile job (Tools -> Multiple Job Compile (All Jobs)";

    /* Post Backup Bullet Points */
    document.getElementById("backupFour").innerHTML = "Export Batch_" + datamart + ", with executables, exclude read-only to \\ERA\\trunk\\Releases\\" + datamart + "\\" + releaseVersion + "\\backup\\Batch_" + datamart + "_" + enviornmentType + "_Post.dsx";
    document.getElementById("backupFive").innerHTML = "Commit to SVN with comment \"" + datamart + " " + releaseVersion + " to " + enviornmentType + " after migration\"";
    document.getElementById("backupSix").innerHTML = "Close DS Designer connection to " + datamart + "_" + enviornmentType + " on " + server;

    /* Environment Variable Points */
    document.getElementById("migrateVariableOne").innerHTML = "Open DS Administrator log in to " + server + " and open the environment variables for " + datamart + "_" + enviornmentType;
    document.getElementById("migrateVariableTwo").innerHTML = "Manually migrate the variables listed in the summary of this document";
    document.getElementById("migrateVariableThree").innerHTML = "Make sure to click \"Ok\" once you are done changing the variables";

}