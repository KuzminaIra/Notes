path = window.location.host;
formArguments = null;
setYes = null;
setNo  = null;
closeForm = null;

function saveNote(srcId, upd) {
    let note_name = document.getElementById("noteName")
    let note_body = document.getElementById("noteBody")
    axios.get("/request/save_note", {
        withCredentials: true,
        params: {
            "id": srcId,
            "name": note_name.value,
            "body": note_body.value
        }
    }).then(function (object){
        if (upd) {
            location.reload()
        }
    });
  }

function warning(message, args, yesFunction, noFunction) {
    formArguments = args;
    setYes = yesFunction;
    setNo = noFunction;
    let sidebar = document.getElementById("sidebar");
    let messagePlate = document.createElement("div");
    messagePlate.setAttribute("class", "message");
    let info = document.createElement("h4");
    info.textContent = message;
    messagePlate.appendChild(info);
    let buttons = document.createElement("div");
    buttons.setAttribute("class", "message-buttons");
    let noButton = document.createElement("button");
    noButton.setAttribute("onclick", "setNo(formArguments); closeForm(); event.stopPropagation()");
    noButton.textContent = "Нет";
    noButton.setAttribute("class", "button delete-btn");
    let yesButton = document.createElement("button");
    yesButton.setAttribute("onclick", "setYes(formArguments); closeForm(); event.stopPropagation()");
    yesButton.textContent = "Да";
    yesButton.setAttribute("class", "button primary-btn");
    sidebar.appendChild(messagePlate);
    messagePlate.appendChild(buttons);
    buttons.appendChild(yesButton);
    buttons.appendChild(noButton);
    closeForm = function() {
        messagePlate.remove();
    }
}
function removeAccepted(srcId) {
    axios.get("/request/remove_group", {
        withCredentials: true,
        params: {
            "id": srcId
        }
    }).then(function (res){
        location.reload();
    });
}
function doNothing(srcId) {
}
function removeGroup(srcId) {
    warning("Данную операцию будет невозможно отменить, вы уверены?", srcId, removeAccepted, doNothing);
}
function removeNote(srcId) {
    warning("Данную операцию будет невозможно отменить, вы уверены?", srcId, removeNoteAccepted, doNothing);
}
function removeNoteAccepted(srcId) {
    axios.get("/request/remove_note", {
        withCredentials: true,
        params: {
            "id": srcId
        }
    }).then(function (res){
        location.reload();
    });
}
function renameGroup(srcId) {
    let name = document.getElementById(srcId);
    let defaultValue = name.textContent;
    let group = document.getElementById(srcId + "group");
    let element = document.createElement("input");
    element.setAttribute("type", "text");
    element.setAttribute("class", "form-input");
    element.setAttribute("value", defaultValue);
    let renameButton = document.createElement("button");
    renameButton.setAttribute("type", "button");
    renameButton.setAttribute("class", "button primary-btn group-rename-btn");
    renameButton.textContent = "Подтвердить переименование";
    group.insertBefore(element, group.firstChild);
    group.insertBefore(renameButton, group.firstChild);
    renameButton.addEventListener('click', function (event) {
        if ((element.value == null) || (element.value === "")) {
            name.textContent = defaultValue;
        } else {
            name.textContent = element.value;
            axios.get("/request/rename_group", {
                withCredentials: true,
                params: {
                    "id": srcId,
                    "name": element.value
                }
            });
        }
        renameButton.remove();
        element.remove();
    });
    element.addEventListener('keyup', function (ev) {
        ev.stopPropagation();
    })
    element.addEventListener('keydown', function (ev) {
        ev.stopPropagation();
    })
    element.addEventListener('keypress', function (ev) {
        ev.stopPropagation();
    })
    element.focus();
}
function addGroup() {
    let list = document.getElementById("groupList");
    let element = document.createElement("input");
    element.setAttribute("type", "text");
    element.setAttribute("class", "form-input group-add-input");
    let addButton = document.createElement("button");
    addButton.setAttribute("type", "button");
    addButton.setAttribute("class", "button primary-btn group-add-btn");
    addButton.textContent = "Добавить";
    list.insertBefore(element, list.firstChild);
    list.insertBefore(addButton, list.firstChild);
    addButton.addEventListener('click', function (event) {
        if ((element.value == null) || (element.value === "")) {
            element.remove();
            addButton.remove();
        } else {
            axios.get("/request/new_group", {
                withCredentials: true,
                params: {
                    "name": element.value
                }
            }).then(res => {
                location.reload();
            });
        }
    });
    element.addEventListener('focusout', function (event) {
        if ((element.value == null) || (element.value === "")) {
            element.remove();
            addButton.remove();
        } else {
            axios.get("/request/new_group", {
                withCredentials: true,
                params: {
                    "name": element.value
                }
            }).then(res => {
                location.reload();
            });
        }
    });
    element.focus();
}