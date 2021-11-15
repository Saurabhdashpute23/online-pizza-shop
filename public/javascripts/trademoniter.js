var socket = io.connect("http://localhost:8081");
socket.on("updatedTdata", (responseData) => {
    console.log("received data");
    rederTradeData(responseData);
});


var rederTradeData = (data) => {
    data = JSON.parse(data);
    $("#trade_body").empty();
    data.tradeData.forEach((tradeItem, index) => {
        var trTag = $("<tr></tr>");
        for (var key in tradeItem) {
            var td = $("<td></td>").text(tradeItem[key]);
            
            trTag.append(td);
        }
        $("#trade_body").append(trTag);
    });
}

