import mailChannelsPlugin from "@cloudflare/pages-plugin-mailchannels";

export const onRequest: PagesFunction = mailChannelsPlugin({
  personalizations: [
    {
      to: [
        { name: "Kerry Hatcher", email: "kerry.hatcher@gasdf.us" },
        { name: "Join", email: "join@gasdf.us" }
      ],
    },
  ],
    from: { name: "Website Form", email: "noreply@gasdf.us" },
    subject: (formData) => { 
      const message = formData.get("message");

      if (message && message.trim().length > 0) {
        return "<SPAM> New contact form submission <SPAM>";
      } else {
        return "New contact form submission";
      }
      
        

    },
  respondWith: (formData) => {
    // return new Response(`Thank you for submitting your enquiry. A member of the team will be in touch shortly.`);
      
      
    return new Response(null, {
      status: 302,
      headers: { Location: "/pages/joinform/" },
    });
  },
});
