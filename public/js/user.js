var $table = $('#table_account');

$(function() {
    $.ajax({
        type: "GET",
        url: "../Rest/Schemas/Account",
        success: function(data) {
            var pTable = data;
            var pColumns = [];
            for (var i = 0; i < pTable.BootstrapTableFields.length; i++) {
                var pField = pTable.BootstrapTableFields[i];
                var pColumn = {
                    "title": pField.Alias,
                    "field": pField.Name,
                    "align": 'center',
                    "valign": 'middle',
                    "sortable": pField.Sortable,
                };
                if (pColumn.field == "account") {
                    pColumn.formatter = table_formatter_account;
                }
                pColumns.push(pColumn);
            }
            $table.bootstrapTable({
                sortName: 'id',
                sortOrder: 'asc',
                columns: pColumns
            });
        }
    });
});

function table_formatter_account(value, row, index) {
    return [
        '<a class="link" title="" href="' + 'player.html?Id=' + row.id + '">',
        row.account,
        '</a>'
    ].join('');
}