/**
 * Handle the data returned by IndexServlet
 * @param resultDataString jsonObject, consists of session info
 */
function handleSessionData(resultDataString) {
    resultDataJson = JSON.parse(resultDataString);

    console.log("handle session response");
    console.log(resultDataJson);
    console.log(resultDataJson["sessionID"]);

    // show the session information 
    $("#sessionID").text("Session ID: " + resultDataJson["sessionID"]);
    $("#lastAccessTime").text("Last access time: " + resultDataJson["lastAccessTime"]);
}

/**
 * Handle the items in item list 
 * @param resultDataString jsonObject, needs to be parsed to html 
 */
function handleCartArray(resultDataString) {
    const resultArray = resultDataString.split(",");
    //console.log(resultArray.length);
    
    // change it to html list    
    let res = "<table id='star_table' class='table table-striped'>";
    res += ("<thead><tr><th>No.</th><th>Title</th><th>Qty</th></tr></thead><tbody>");
    for(let i = 1; i < resultArray.length; i += 2){
    	let num = Math.floor(i/2)+1;
    	res += "<tr>";
    	res += "<td>" + num + "</td>";
    	res += "<td>" + resultArray[i-1] + "</td>"
    	res += "<td>" + resultArray[i] + "</td>" 
    	res += "</tr>";
    }
    res += "</tbody></table>";
    
    // clear the old array and show the new array in the frontend
    $("#item_list").html("");
    $("#item_list").append(res);
}


/**
 * Submit form content with POST method
 * @param cartEvent
 */
function handleCartInfo(cartEvent) {
    console.log("submit cart form");
    /**
     * When users click the submit button, the browser will not direct
     * users to the url defined in HTML form. Instead, it will call this
     * event handler when the event is triggered.
     */
    cartEvent.preventDefault();

    $.get(
        "api/shoppingCart",
        // Serialize the cart form to the data sent by POST request
        $("#cart").serialize(),
        (resultDataString) => handleCartArray(resultDataString)
    );
}

function handleRemoval(purchaseEvent) {
    console.log("Click Remove");
    /**
     * When users click the submit button, the browser will not direct
     * users to the url defined in HTML form. Instead, it will call this
     * event handler when the event is triggered.
     */
    //alert("Text: " + $("#cart tbody tr td:nth-child(1) input").attr("value"));
    //alert("Text: " + $("#cart tbody tr td:nth-child(1) input").val());
    purchaseEvent.preventDefault();

    $.get(
        "api/shoppingCart",
        // Serialize the cart form to the data sent by POST request
        {removeMovie: $("#cart tbody tr td:nth-child(1) input").val()},
        (resultDataString) => handleCartArray(resultDataString)
    );
}



$.ajax({
    type: "POST",
    url: "api/shoppingCart",
    success: (resultDataString) => handleSessionData(resultDataString)
});

// Bind the submit action of the form to a event handler function
$("#cart").submit((event) => handleCartInfo(event));
$("#btnText").click((event) => handleRemoval(event));
