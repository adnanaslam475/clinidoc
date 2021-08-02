
const PostData = (url, statusCode, req, token, callback) => {
  // console.log('post_data=>', url, statu sCode, req, token, callback)
  let object;
  fetch(url, {
    method: 'POST',
    headers: {
      'Access-Control-Request-Headers': 'Content-Type',
      'Content-Type': 'application/json',
      "Authorization": token

    },
    body: JSON.stringify(req),
  })
    .then(function (response) {
      if (response.status != statusCode) {
        console.log('Looks like there was a problem. Status Code: ' + response.status);
        try {
          return response.json()
        }
        catch (e) {
          // console.log('Server Error => ', e)
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
export default PostData;