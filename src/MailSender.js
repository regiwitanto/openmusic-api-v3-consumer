const nodemailer = require('nodemailer');
const config = require('./utils/config');

class MailSender {
  constructor() {
    this._transporter = nodemailer.createTransport({
      host: config.nodemailerSmtp.host,
      port: config.nodemailerSmtp.port,
      auth: {
        user: config.nodemailerSmtp.user,
        pass: config.nodemailerSmtp.pass,
      },
    });
  }

  sendEmail(targetEmail, content) {
    const message = {
      from: 'Playlists Service',
      to: targetEmail,
      subject: 'Ekspor Daftar Lagu',
      text: 'Terlampir hasil dari ekspor daftar lagu',
      attachments: [
        {
          filename: 'playlists.json',
          content,
        },
      ],
    };

    return this._transporter.sendMail(message);
  }
}

module.exports = MailSender;
