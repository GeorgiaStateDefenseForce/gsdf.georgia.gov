import staticFormsPlugin from "@cloudflare/pages-plugin-static-forms";


export const onRequest: PagesFunction = staticFormsPlugin({
  respondWith: ({ formData, name }) => {
        const email = formData.get('email')
        console.log(Response)
        var response = new Response(`Hello, ${email}! Thank you for submitting the ${name} form.`);
        
        var resp = response.redirect("/", 302)
        return resp   
  }
});



export const onRequest = [errorHandling, authentication];
