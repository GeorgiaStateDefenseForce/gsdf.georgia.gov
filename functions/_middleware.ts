import staticFormsPlugin from "@cloudflare/pages-plugin-static-forms";
import mailChannelsPlugin from "@cloudflare/pages-plugin-mailchannels";


// async function password_site(context: {
//   request: Request;
//   next: () => Promise<Response>;
//   env: { CFP_PASSWORD?: string };
// }): Promise<Response> {
//   const { request, next, env } = context;
//   const { pathname, searchParams } = new URL(request.url);
//   const { error } = Object.fromEntries(searchParams);
//   const cookie = request.headers.get('cookie') || '';
//   const cookieKeyValue = await getCookieKeyValue(env.CFP_PASSWORD);

//   if (
//     cookie.includes(cookieKeyValue) ||
//     CFP_ALLOWED_PATHS.includes(pathname) ||
//     !env.CFP_PASSWORD
//   ) {
//     // Correct hash in cookie, allowed path, or no password set.
//     // Continue to next middleware.
//     return await next();
//   } else {
//     // No cookie or incorrect hash in cookie. Redirect to login.
//     return new Response(getTemplate({ redirectPath: pathname, withError: error === '1' }), {
//       headers: {
//         'content-type': 'text/html'
//       }
//     });
//   }
// }


export const onRequest = [

  // password_site,

  // staticFormsPlugin({
  //   respondWith: ({ formData, name }) => {
  //         const email = formData.get('email')
  //         return new Response(`Hello, ${email}! Thank you for submitting the ${name} form.`)   
  //   }
  // }),
  mailChannelsPlugin({
    personalizations: [{
      to: [{ name: "Kerry Hatcher", email: "kerry.hatcher@gasdf.us" }],
    },],
    from: { name: "Website Form", email: "noreply@gasdf.us", },
    
    respondWith: () => {
      // return new Response(`Thank you for submitting your enquiry. A member of the team will be in touch shortly.`);
      return new Response(null, {
        status: 302,
        headers: { Location: "/pages/join_form_message/" },
      })
    },
})
];