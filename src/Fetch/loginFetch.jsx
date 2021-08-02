const GetData = (url, statusCode, req, callback) => {
  let token;
  let object;
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Headers": "*"

    },
    body: JSON.stringify(req)
  })
  .then(function (response) {
    if (response.status !== statusCode) {
      console.log(
        "Looks like there was a problem. Status Code: " + response.status
      );
      return null;
    } 
    else {

      token = response.headers.get("Authorization");
      console.log(token)
      return response.json();
    }
  })
  .then(async function (data) {

    // if (data) {
    //   console.log("Success");
    // } else {
    //   console.log("Failed");
    // }
    callback(data, token);
  });
};

export default GetData;
