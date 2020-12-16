"use strict";

/**
 * Module dependencies
 */

/* eslint-disable import/no-unresolved */
/* eslint-disable prefer-template */
// Public node modules.
const nodemailer = require("nodemailer");
const { removeUndefined } = require('strapi-utils');
const inlineBase64 = require('nodemailer-plugin-inline-base64');

/* eslint-disable no-unused-vars */
module.exports = {
  init: (providerOptions = {}, settings = {}) => {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        type: "OAuth2",
        user: providerOptions.username,
        clientId: providerOptions.clientId,
        clientSecret: providerOptions.clientSecret,
        refreshToken: providerOptions.refreshToken,
        accessToken: providerOptions.accessToken,
        expires: 1484314697598
      },
    });

    return {
      send: options => {
        return new Promise((resolve, reject) => {
          const { from, to, cc, bcc, replyTo, subject, text, html, hasBase64Image, ...rest } = options;

          let msg = {
            from: from || settings.defaultFrom,
            to,
            cc,
            bcc,
            replyTo: replyTo || settings.defaultReplyTo,
            subject,
            text,
            html,
            hasBase64Image: hasBase64Image || true,
            ...rest,
          };

          if (hasBase64Image) {
            transporter.use('compile', inlineBase64({cidPrefix: 'prefix_'}));
          }
          
          transporter.sendMail(removeUndefined(msg), function(err) {
            if (err) {
              reject([{ messages: [{ id: 'Auth.form.error.email.invalid' }] }]);
            } else {
              resolve();
            }
          });
        });
      },
    };
  },
};
