//jQuery(document), apukirjasto, voidaan korvata $:lla, document.

$(document).ready(() => {

    //# viittaa id:hen, . viittaa luokkaan, ilman viitaa tagiin
    //googleen datatable!!
    let table = $("#materials_table").DataTable({
        ajax: {
            type: "GET",
            datatype: "json",
            url: "/api/materials",
            dataSrc: ""

        },
        rowId: "_id",
        columns: [
            {data: "_id", type: "readonly", visible: false},
            {data: "name", type: "text", required: true},
            {data: "min_density", type: "float", required: true},
            {data: "max_density", type: "float", required: true},
            {data: "min_strength", type: "float", required: true},
            {data: "max_strength", type: "float", required: true},
            {data: "min_strength_density", type: "float", required: false},
            {data: "max_strength_density", type: "float", required: false}
        ],

        dom: "Bfrtip",
        select: "single",
        responsive: true,
        altEditor: true,
        buttons: [
            "columnsToggle",
            {
                text: "Create",
                name: "add"
            },
            {
                text: "Edit",
                name: "edit"
            },
            {
                text: "Delete",
                name: "delete"
            },
            {
                text: "Refresh",
                name: "refresh"
            }

        ],
        //kato dokumentaatio google: alteditor
        onAddRow: (datatable, rowdata, success, error)=>{
            $.ajax({
                url: "/api/material",
                type: "POST",
                data: rowdata,
                success: success,
                error: error
            });
        },
        onDeleteRow: (datatable, rowdata, success, error)=>{
            $.ajax({
                url: "/api/material/" + rowdata._id,
                type: "DELETE",
                data: rowdata,
                success: success,
                error: error
            });
        },
        onEditRow: (datatable, rowdata, success, error)=>{
            $.ajax({
                url: "/api/material/" + rowdata._id,
                type: "PUT",
                data: rowdata,
                success: success,
                error: error
            });
        }

    });
});
