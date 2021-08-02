
const GetData = (url, statusCode, token, callback) => {
  // console.log('from getdata==>', url, statusCode, token, callback);
  let object;
  fetch(url, {
    method: 'Get',
    headers: {
      'Access-Control-Request-Headers': 'Content-Type',
      'Content-Type': 'application/json',
      // "Authorization": "bearer " + token
      "Authorization": token
    },
  })
    .then(function (response) {
      // console.log(response)
      if (response.status != statusCode) {
        console.log('Looks like there was a problem. Status Code: ' + response.status);
        try {
          return response.json()
        }
        catch (e) {
          console.log('Server Error => ', e)
          return response
        }
      }
      else return response.json()
    })
    .then(function (data) {
      object = data;
      callback(object);
    }
    )
}
export default GetData;