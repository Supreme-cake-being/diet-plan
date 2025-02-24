import nodemailer from 'nodemailer';
import 'dotenv/config';

const { BASE_URL, SMTP_EMAIL, SMTP_PASSWORD } = process.env;

const nodemailerConfig = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: SMTP_EMAIL,
    pass: SMTP_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

export const sendEmail = (
  email: string,
  name: string,
  verificationToken: string
) => {
  const emailVerificationData = {
    to: email,
    subject: 'Email verification',
    html: `
            <table style='background-color:rgb(152, 231, 227); font-size: 16px; margin: 0 auto; border: none'>
              <thead style='padding: 15px 20px'>
                <tr>
                  <td style='color: #fff; text-align: center'>
                    <h2>Welcome, ${name}!</h2>
                    <p>Our team is glad to see you on this <strong>Diet Plan</strong> service.</p>
                  </td>
                </tr>
              </thead>

              <tbody style='color: #2F2F2F; background-color: #fff'>
                <tr>
                  <td style='padding: 15px 20px'>
                    <p style='text-align: center'>We must verificate your <strong>e-mail</strong> address.</p>
                    <p style='text-align: center'>It's simple, a one think you have to do -  is to follow this link:
                      <strong>
                        <a href='${BASE_URL}/api/users/verify/${verificationToken}'>
                          click here
                        </a>
                      </strong>
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
        `,
  };

  const mail = { ...emailVerificationData, from: SMTP_EMAIL };
  return transport.sendMail(mail);
};
