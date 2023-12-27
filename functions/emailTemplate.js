const emailTemplate = (name, price, orderID, conferenceCode, date) => {
  return `
  <!DOCTYPE html>
  <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
  <head>
      <title></title>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
      <style>
          * {
              box-sizing: border-box;
          }
  
          body {
              margin: 0;
              padding: 0;
          }
  
          a[x-apple-data-detectors] {
              color: inherit !important;
              text-decoration: inherit !important;
          }
  
          #MessageViewBody a {
              color: inherit;
              text-decoration: none;
          }
  
          p {
              line-height: inherit
          }
  
          .desktop_hide,
          .desktop_hide table {
              mso-hide: all;
              display: none;
              max-height: 0px;
              overflow: hidden;
          }
  
          .image_block img+div {
              display: none;
          }
  
          @media (max-width:700px) {
  
              .desktop_hide table.icons-inner,
              .social_block.desktop_hide .social-table {
                  display: inline-block !important;
              }
  
              .icons-inner {
                  text-align: center;
              }
  
              .icons-inner td {
                  margin: 0 auto;
              }
  
              .mobile_hide {
                  display: none;
              }
  
              .row-content {
                  width: 100% !important;
              }
  
              .stack .column {
                  width: 100%;
                  display: block;
              }
  
              .mobile_hide {
                  min-height: 0;
                  max-height: 0;
                  max-width: 0;
                  overflow: hidden;
                  font-size: 0px;
              }
  
              .desktop_hide,
              .desktop_hide table {
                  display: table !important;
                  max-height: none !important;
              }
          }
      </style>
  </head>
  <body style="background-color: #f9f9f9; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
      <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f9f9f9;">
          <tbody>
              <tr>
                  <td>
                      <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                          <tbody>
                              <tr>
                                  <td>
                                      <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #a41034; color: #000000; width: 680px; margin: 0 auto;" width="680">
                                          <tbody>
                                              <tr>
                                                  <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                      <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                          <tr>
                                                              <td class="pad" style="padding-bottom:10px;padding-top:10px;width:100%;">
                                                                  <div class="alignment" align="center" style="line-height:10px">
                                                                      <div style="max-width: 680px;"><img src="https://my.hpair.org/art/HPAIR%20Logo%20Banner%20(White).png" style="display: block; height: auto; border: 0; width: 100%;" width="680" alt="HPAIR Logo" title="HPAIR Logo"></div>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                  </td>
                                              </tr>
                                          </tbody>
                                      </table>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                      <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                          <tbody>
                              <tr>
                                  <td>
                                      <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffeaea; color: #000000; width: 680px; margin: 0 auto;" width="680">
                                          <tbody>
                                              <tr>
                                                  <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 20px; padding-top: 20px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                      <div class="spacer_block block-1" style="height:70px;line-height:70px;font-size:1px;">&#8202;</div>
                                                      <table class="image_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                        <tr>
                                                            <td class="pad" style="width:100%; text-align:center;">
                                                                <div class="alignment" align="center" style="line-height:10px; max-width: 93px; margin: 0 auto;">
                                                                    <img src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/4971/check-icon.png" style="display: block; height: auto; border: 0; width: 100%;" width="93" alt="Check Icon" title="Check Icon">
                                                                </div>
                                                                <div style="color:#2f2f2f; font-family:Georgia,Times,'Times New Roman',serif; font-size:32px; line-height:120%; text-align:center; mso-line-height-alt:50.4px; padding-bottom:25px; padding-top:10px;">
                                                                    <p style="margin: 0; word-break: break-word;"><span>Payment received</span></p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                      </table>
                                                      <table class="paragraph_block block-4" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                          <tr>
                                                              <td class="pad" style="padding-left:30px;padding-right:30px;padding-top:10px;">
                                                                  <div style="color:#2f2f2f;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:16px;line-height:150%;text-align:center;mso-line-height-alt:24px;">
                                                                      <p style="margin: 0; word-break: break-word;"><span>Hello ${name},</span></p>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                      <table class="paragraph_block block-5" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                          <tr>
                                                              <td class="pad" style="padding-left:30px;padding-right:30px;">
                                                                  <div style="color:#2f2f2f;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:14px;line-height:150%;text-align:center;mso-line-height-alt:21px;">
                                                                      <p style="margin: 0; word-break: break-word;">&nbsp;</p>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                      <table class="paragraph_block block-6" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                          <tr>
                                                              <td class="pad" style="padding-left:30px;padding-right:30px;">
                                                                  <div style="color:#2f2f2f;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:16px;line-height:150%;text-align:center;mso-line-height-alt:24px;">
                                                                      <p style="margin: 0; word-break: break-word;"><span>Thank you for your payment of <strong><span>$${price}</span></strong> USD on <strong><span>${date}.</span></strong></span></p>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                      <table class="paragraph_block block-7" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                          <tr>
                                                              <td class="pad" style="padding-bottom:10px;padding-left:30px;padding-right:30px;">
                                                                  <div style="color:#2f2f2f;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:14px;line-height:150%;text-align:center;mso-line-height-alt:21px;">
                                                                      <p style="margin: 0; word-break: break-word;">&nbsp;</p>
                                                                      <p style="margin: 0; word-break: break-word;"><span style="color: #000000;">We look forward to meeting you at the conference!</span></p>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                      <div class="spacer_block block-8" style="height:70px;line-height:70px;font-size:1px;">&#8202;</div>
                                                  </td>
                                              </tr>
                                          </tbody>
                                      </table>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                      
                      <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                          <tbody>
                              <tr>
                                  <td>
                                      <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 680px; margin: 0 auto;" width="680">
                                          <tbody>
                                              <tr>
                                                  <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                      <table class="paragraph_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                          <tr>
                                                              <td class="pad" style="padding-bottom:20px;padding-left:20px;padding-right:20px;padding-top:50px;">
                                                                  <div style="color:#2f2f2f;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:18px;letter-spacing:1px;line-height:120%;text-align:center;mso-line-height-alt:21.599999999999998px;">
                                                                      <p style="margin: 0; word-break: break-word;"><strong><span>PAYMENT DETAILS</span></strong></p>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                  </td>
                                              </tr>
                                          </tbody>
                                      </table>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                      <table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                          <tbody>
                              <tr>
                                  <td>
                                      <table class="row-content" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 680px; margin: 0 auto;" width="680">
                                          <tbody>
                                              <tr>
                                                  <td class="column column-1" width="50%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                      <table class="paragraph_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                          <tr>
                                                              <td class="pad" style="padding-bottom:10px;padding-left:10px;padding-right:20px;padding-top:10px;">
                                                                  <div style="color:#393d47;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:16px;line-height:200%;text-align:right;mso-line-height-alt:32px;">
                                                                      <p style="margin: 0; word-break: break-word;"><strong><span><span style="color: #5d77a9;">Item</span></span></strong></p>
                                                                      <p style="margin: 0; word-break: break-word;"><strong><span><span style="color: #5d77a9;">Amount</span></span></strong></p>
                                                                      <p style="margin: 0; word-break: break-word;"><strong><span><span style="color: #5d77a9;">Date</span></span></strong></p>
                                                                      <p style="margin: 0; word-break: break-word;"><strong><span><span style="color: #5d77a9;">Confirmation</span></span></strong></p>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                  </td>
                                                  <td class="column column-2" width="50%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                      <table class="paragraph_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                          <tr>
                                                              <td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:10px;padding-top:10px;">
                                                                  <div style="color:#2f2f2f;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:16px;line-height:200%;text-align:left;mso-line-height-alt:32px;">
                                                                      <p style="margin: 0; word-break: break-word;"><span>${conferenceCode} Conference</span></p>
                                                                      <p style="margin: 0; word-break: break-word;"><span>$${price} USD</span></p>
                                                                      <p style="margin: 0; word-break: break-word;"><span>${date}</span></p>
                                                                      <p style="margin: 0; word-break: break-word;">${orderID}</p>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                  </td>
                                              </tr>
                                          </tbody>
                                      </table>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                      <table class="row row-5" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                          <tbody>
                              <tr>
                                  <td>
                                      <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 680px; margin: 0 auto;" width="680">
                                          <tbody>
                                              <tr>
                                                  <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                      <table class="paragraph_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                          <tr>
                                                              <td class="pad" style="padding-bottom:40px;padding-left:30px;padding-right:30px;padding-top:40px;">
                                                                  <div style="color:#2f2f2f;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:14px;line-height:150%;text-align:center;mso-line-height-alt:21px;">
                                                                      <p style="margin: 0; word-break: break-word;"><span style="color: #000000;">Please reach out to our dedicated support team at <a href="mailto:help%40hpair.org" target="_blank" title="help@hpair.org" style="text-decoration: underline; color: #8a3b8f;" rel="noopener">help@hpair.org</a> for any assistance.</span></p>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                  </td>
                                              </tr>
                                          </tbody>
                                      </table>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                      <table class="row row-6" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                          <tbody>
                              <tr>
                                  <td>
                                      <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #a41034; color: #000000; width: 680px; margin: 0 auto;" width="680">
                                          <tbody>
                                              <tr>
                                                  <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                      <div class="spacer_block block-1" style="height:20px;line-height:20px;font-size:1px;">&#8202;</div>
                                                      <table class="image_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                          <tr>
                                                              <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
                                                                  <div class="alignment" align="center" style="line-height:10px">
                                                                      <div style="max-width: 204px;"><img src="https://my.hpair.org/art/HPAIR%20Logo%20Banner%20(White).png" style="display: block; height: auto; border: 0; width: 100%;" width="204" alt="Yourlogo Light" title="Yourlogo Light"></div>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                      <table class="social_block block-3" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                          <tr>
                                                              <td class="pad">
                                                                  <div class="alignment" align="center">
                                                                      <table class="social-table" width="144px" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block;">
                                                                          <tr>
                                                                              <td style="padding:0 2px 0 2px;"><a href="https://www.facebook.com/official.hpair/" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-circle-white/facebook@2x.png" width="32" height="32" alt="Facebook" title="Facebook" style="display: block; height: auto; border: 0;"></a></td>
                                                                              <td style="padding:0 2px 0 2px;"><a href="https://www.instagram.com/officialhpair/?hl=en" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-circle-white/instagram@2x.png" width="32" height="32" alt="Instagram" title="Instagram" style="display: block; height: auto; border: 0;"></a></td>
                                                                              <td style="padding:0 2px 0 2px;"><a href="https://www.hpair.org" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-circle-white/website@2x.png" width="32" height="32" alt="Web Site" title="Web Site" style="display: block; height: auto; border: 0;"></a></td>
                                                                              <td style="padding:0 2px 0 2px;"><a href="https://www.linkedin.com/company/harvard-project-for-asian-and-international-relations-hpair-/" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-circle-white/linkedin@2x.png" width="32" height="32" alt="LinkedIn" title="LinkedIn" style="display: block; height: auto; border: 0;"></a></td>
                                                                          </tr>
                                                                      </table>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                      <table class="paragraph_block block-4" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                          <tr>
                                                              <td class="pad">
                                                                  <div style="color:#f9f9f9;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:12px;line-height:150%;text-align:center;mso-line-height-alt:18px;">
                                                                      <p style="margin: 0;">Harvard College Project for Asian and International Relations<br>Mailbox 247<br>SOCH<br>59 Shepard Street<br>Cambridge, MA 02138-7579</p>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                  </td>
                                              </tr>
                                          </tbody>
                                      </table>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                      <table class="row row-7" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                          <tbody>
                              <tr>
                                  <td>
                                      <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #a41034; color: #000000; width: 680px; margin: 0 auto;" width="680">
                                          <tbody>
                                              <tr>
                                                  <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 20px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                      <table class="paragraph_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                          <tr>
                                                              <td class="pad">
                                                                  <div style="color:#cfceca;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:12px;line-height:120%;text-align:center;mso-line-height-alt:14.399999999999999px;">
                                                                      <p style="margin: 0; word-break: break-word;"><span>2024 © Harvard College Project for Asian and International Relations | All Rights Reserved</span></p>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                  </td>
                                              </tr>
                                          </tbody>
                                      </table>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                  </td>
              </tr>
          </tbody>
      </table><!-- End -->
  </body>
  </html>
  `;
}

module.exports = {
    emailTemplate
};