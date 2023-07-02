// import staticFormsPlugin from "@cloudflare/pages-plugin-static-forms";

// export const onRequest: PagesFunction = staticFormsPlugin({
//   respondWith: ({ formData, name }) => {
//     const email = formData.get('email')
//     return new Response(`Hello, ${email}! Thank you for submitting the ${name} form.`)
//   }
// });

export async function onRequestPost(context) {
  try {
    let input = await context.request.formData();
    // Convert FormData to JSON
    // NOTE: Allows multiple values per key
    console.log(input);
    let output = {};
    for (let [key, value] of input) {
      let tmp = output[key];
      if (tmp === undefined) {
        output[key] = value;
      } else {
        output[key] = [].concat(tmp, value);
      }
    }

    let token, secret;
    token = input.get('cf-turnstile-response') ? input.get('cf-turnstile-response').toString() : false;
    secret = env.TURNSTILE_KEY ? env.TURNSTILE_KEY.toString() : false;
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
    let ip = request.headers.get('CF-Connecting-IP');
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
    //if (!outcome.success) {
    //  console.log("Token Failure from " + ip);
    //  return new Response('The provided Spam Protection token was not valid!', { status: 401 });
    //  //return next();
    //}
    input.delete("cf-turnstile-response");

    // let googleFormData = new FormData();
    // googleFormData.append('entry.299316044', formData.get("fname").toString());
    // googleFormData.append('entry.246872012', formData.get("lname").toString());
    // googleFormData.append('entry.1819157110', formData.get("email").toString());
    // googleFormData.append('entry.1829779236', formData.get("phone").toString());
    // googleFormData.append('entry.1152223255', formData.get("city").toString());
    // googleFormData.append('entry.433270788', formData.get("state").toString());
    // googleFormData.append('entry.1514106883', formData.get("findout").toString());
    // googleFormData.append('entry.909904957', formData.get("preferred").toString());
    // console.log(googleFormData);
    let googleUrl = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSeJAeEHO1H4vpLkMdwG1kc_U4KtAEAYFqbgeDXbhDpXQuFpvA/formResponse';
    let googleResult = await fetch(googleUrl, {
      body: input,
      method: 'POST',
    });
    let googleOutcome = await googleResult.json();
    console.log(googleOutcome);



    let pretty = JSON.stringify(output, null, 2);
    return new Response(pretty, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    });
  } catch (err) {
    return new Response('Error parsing JSON content', { status: 400 });
  }
}