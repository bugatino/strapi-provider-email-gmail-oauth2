# strapi-provider-email-gmail-oauth2-image-base64

## Demo

## Note
This package is a fork of the [strapi-provider-email-nodemailer-gmail-oauth2](https://www.npmjs.com/package/strapi-email-nodemailer-gmail-oauth2). This is to meet the [new required name for Strapi Beta](https://strapi.io/documentation/3.0.0-alpha.x/guides/email.html#usage) (Also changed the OAuth from 2LO Service to 3LO client) and add feature to support insert base64 image in html content of email.

## Usage

1) [Enable Gmail API](https://console.developers.google.com/apis/library/gmail.googleapis.com)
2) [Create OAuth Credential](https://console.developers.google.com/apis/credentials)
3) Set the Authorized Redirect to [https://developers.google.com/oauthplayground](https://developers.google.com/oauthplayground)
4) Take note of your Client ID and Client Secret.
5) Navigate to [https://developers.google.com/oauthplayground](https://developers.google.com/oauthplayground). 
6) In settings, activate "Use your own OAuth credentials". Copy your Client ID and Client Secret.
7) Set scopes to [https://mail.google.com](https://mail.google.com).
8) Exchange Authorization Code.
9) Take note of Refresh and Access Token.
10) Configure the provider in `[strapi-dir]/config/plugins`.

| Variable | Type | Description | Required | Default |
| -------- | ---- | ----------- | -------- | ------- |
| provider | string | The name of the provider you use (in this case is `gmail-oauth2-image-base64`) | yes | |
| providerOptions | object | Provider options | yes | |
| providerOptions.username | string | An email that you want to use to send email with the provider (this email is configured at above step) | yes | | providerOptions.clientId | number | OAuth2 account API Client id (step 4) | yes | |
| providerOptions.clientSecret | string | OAuth2 account API Client Secret (step 4) | yes | |
| providerOptions.refreshToken | string | OAuth2 account API Refresh Token (step 9) | yes | |
| providerOptions.accessToken | string | OAuth2 account API Access Token (step 9) | yes | |
| settings | object | Settings | no | {} |
| settings.defaultFrom | string | Default sender mail address | no | undefined |
| settings.defaultReplyTo | string \| array<string> | Default address or addresses the receiver is asked to reply to | no | undefined |

### Example

**Path -** `config/plugins.js`

```js
module.exports = ({ env }) => ({
  // ...
  email: {
    provider: "gmail-oauth2-image-base64",
    providerOptions: {
      username: env("EMAIL_USERNAME"),
      clientId: env("EMAIL_CLIENT_ID"),
      clientSecret: env("EMAIL_CLIENT_SECRET"),
      refreshToken: env("EMAIL_CLIENT_REFRESH_TOKEN"),
      accessToken: env("EMAIL_CLIENT_ACCESS_TOKEN"),
    },
    settings: {
      defaultFrom: env("EMAIL_USERNAME"),
      defaultReplyTo: env("EMAIL_USERNAME"),
    },
  },
  // ...
});
```
**TIP:** You can using environment file (.env) in the root of project for store variable.

## Enable/Disable base64 image in html email content
If you email don't have base64 image, you can disable this feature by adding a key in options email like this:
```js
await strapi.plugins.email.services.email.sendTemplatedEmail(
      {
        to: data?.email,
        hasBase64Image: false,
      },
      emailTemplate,
      {
        data,
      }
    );
```

## Resources

- [MIT License](LICENSE.md)

## Links

- [Strapi website](http://strapi.io/)
- [Strapi community on Slack](http://slack.strapi.io)
- [Strapi news on Twitter](https://twitter.com/strapijs)

## Installation

```bash
npm i -s strapi-provider-email-gmail-oauth2-image-base64
```
