
export async function onRequestPost(context) {
  
    let input = await context.request.formData();
    // Convert FormData to JSON
    // NOTE: Allows multiple values per key
    // console.log(input);
    let output = {};
    for (let [key, value] of input) {
      let tmp = output[key];
      if (tmp === undefined) {
        output[key] = value;
      } else {
        output[key] = [].concat(tmp, value);
      }
    }
    console.log(input);


  let token, secret;
  token = input.get('cf-turnstile-response') ? input.get('cf-turnstile-response').toString() : false;
  secret = context.env.TURNSTILE_KEY ? context.env.TURNSTILE_KEY : false;
  if (!token) {
    return new Response(`Turnstile = true - but no token found. Check the widget is rendering inside the <form> of your page: https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/.`, {
      status: 512
    })
  };
  if (!secret) {
    return new Response(`Turnstile token found - but no secrey key set. Set an Environment variable with your Turnstile secret called "TURNSTILE_KEY" under Pages > Settings > Environment variables.`, {
      status: 512
    });
  }
  let ip = context.request.headers.get('CF-Connecting-IP');
  let captchaData = new FormData();
  captchaData.append('secret', secret);
  captchaData.append('response', token);
  captchaData.append('remoteip', ip);
  let url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
  let result = await fetch(url, {
    body: captchaData,
    method: 'POST',
  });
  let outcome = await result.json();
  // comment out below for testing google form entry... TODO
  // if (!outcome.success) {
  //  console.log("Token Failure from " + ip);
  //  return new Response('The provided Spam Protection token was not valid!', { status: 401 });
  //  //return next();
  // }
  input.delete("cf-turnstile-response");

  let googleUrl = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSeJAeEHO1H4vpLkMdwG1kc_U4KtAEAYFqbgeDXbhDpXQuFpvA/formResponse';
  // let googleResult = await 
  fetch(googleUrl, {
    method: "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      'entry.299316044': input.get("fname").toString(),
      'entry.246872012': input.get("lname").toString(),
      'entry.1819157110': input.get("email").toString(),
      'entry.1829779236': input.get("phone").toString(),
      'entry.1152223255': input.get("city").toString(),
      'entry.433270788': input.get("state").toString(),
      'entry.1514106883': input.get("findout").toString(),
      'entry.909904957': input.get("preferred").toString()
    })
  }).then(response => {
    if(!response.ok){
      return response.json();
    }
    console.log(`Response OK from Google `);
    console.log("Then:" + response.ok);
  })
  .catch(error => {
    console.log(`[LOGGING FROM /cform.js]: google error: ${error.toString}`);
    console.log("Error: " + error);
  });;
  
  const destinationURL = "https://gsdf.georgia.gov/thank-you/";
  const statusCode = 303;
  return Response.redirect(destinationURL, statusCode);
  
}