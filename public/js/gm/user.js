var $table = $('#table_account');

$(function() {
    $.ajax({
        type: "GET",
        url: "../Rest/Schemas/Account",
        success: function(data) {
            var pTable = data;
            var pColumns = [];
            for (var i = 0; i < pTable.Fields.length; i++) {
                var pField = pTable.Fields[i];
                var pColumn = {
                    "title": pField.Alias,
                    "field": pField.Name,
                    "align": 'center',
                    "valign": 'middle',
                    "sortable": true,
                };
                if (pColumn.field == "Account") {
                    pColumn.formatter = table_formatter_account;
                }
                pColumns.push(pColumn);
            }
            $table.bootstrapTable({
                sortName: 'Id',
                sortOrder: 'asc',
                columns: pColumns
            });
        }
    });
});

function table_formatter_account(value, row, index) {
    return [
        '<a class="link" title="" href="' + 'actor.html?Id=' + row.Id + '">',
        row.Account,
        '</a>'
    ].join('');
}