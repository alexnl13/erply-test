<h2>VAT number checker</h2>

<p>As no extra information is provided regarding the API limitations and what VAT codes it supports, some simple input validation is implemented - input minimum length is 8 symbols (according to my knowledge EU VAT numbers can be 8-14 symbols), white spaces are not allowed in the input and are automatically removed from the input field by the program. The program checks input valididty and while it is not valid, a red frame is displayed around the input area and the submit is disabled. The validation could be adjusted if more information about what kind of VAT numbers are serviced by the API is provided. </p>
<p>As no specific details were given about which data is needed, all fetched data is being displayed to the user and in case of an error, a corresponding message is displayed to the user without technical details.</p>
<p>While fetching the data, loading animation is displayed.</p>
