$(document).ready(function() {
    // Validate form input
    $("form[name='results']").on('submit', function(event) {
        event.preventDefault();  // Prevent form from submitting the usual way

        var htno = $("input[name='ht']").val().trim();  // Get Hall Ticket Number input
        if (htno === "") {
            alert("Please Enter Hall Ticket Number!");
            // Reset result table in case of validation error
            $('#result').html("<tr><th>Subject</th><th>Internal Marks</th><th>External Marks</th><th>Marks</th><th>Credits</th></tr>");
            $('#agg').html("");
            return false;
        }

        // Show loading indicator
        $('#loading').show();

        // Perform AJAX request to fetch results
        $.ajax({
            type: "POST",
            url: "results.php",  // Ensure results.php exists and handles the request
            data: { ht: htno },
            success: function(response) {
                // Hide loading indicator after results are fetched
                $('#loading').hide();

                // Clear previous results
                $('#agg').html("");
                $('#name').html("");
                $('#result').html("");
                $('#ovr').html("");
                
                // Inject new results into the page
                $('#temp').html(response);
            },
            error: function() {
                // Handle any connection errors
                alert("Connection problem. Please try again.");
                $('#loading').hide();
            }
        });

        return false;
    });
});
