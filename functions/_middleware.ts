import mailChannelsPlugin from "@cloudflare/pages-plugin-mailchannels";

export const onRequest = [
  mailChannelsPlugin({
    personalizations: [
      {
        to: [{ name: "Kerry Hatcher", email: "kerry.hatcher@gasdf.us" }],
      },
    ],
    from: { name: "Website Form", email: "noreply@gasdf.us" },
    respondWith: () => {
      // return new Response(`Thank you for submitting your enquiry. A member of the team will be in touch shortly.`);
      return new Response(null, {
        status: 302,
        headers: { Location: "/pages/join_form_message/" },
      });
    },
  }),
];
