const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

async function sendVerificationEmail(userEmail, verificationCode) {
  try {
    const mailOptions = {
      from: '"Мониторинг подписок" <verify.email.code79@gmail.com>',
      to: userEmail,
      subject: "Код подтверждения",
      text: `Ваш код подтверждения: ${verificationCode}`,
      html: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2>Подтверждение email</h2>
            <p>Ваш код подтверждения:</p>
            <h1 style="color: #4CAF50; font-size: 32px;">${verificationCode}</h1>
            <p>Код действителен в течение 10 минут.</p>
          </div>
        `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Письмо отправлено:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Ошибка отправки:", error);
    return { success: false, error: error.message };
  }
}

async function sendSubscriptionDebitNotification(userEmail, subscriptionDetails) {
  try {
    const {
      subscriptionName,
      amount,
      currency = '₽',
      in_a_few
    } = subscriptionDetails;

    let dayForm

    switch (in_a_few) {
      case 3:
      case 2:
        dayForm = "дня"
        break;
      case 1:
        dayForm = "день"
        break;
      default:
        break;
    }

    const mailOptions = {
      from: '"Мониторинг подписок" <verify.email.code79@gmail.com>',
      to: userEmail,
      subject: "Предупреждение",
      text: `Через ${in_a_few} ${dayForm} произойдет списание средств за подписку ${subscriptionName}`,
      html: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2>Списание за подписку</h2>
            <p>Через ${in_a_few} ${dayForm} произойдет списание средств за подписку ${subscriptionName}</p>
            <h1 style="color: #4CAF50; font-size: 32px;">${amount}${currency}</h1>
            <p>Хорошего вам дня!</p>
          </div>
        `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Уведомление о списании отправлено:`, info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Ошибка отправки:", error);
    return { success: false, error: error.message };
  }
}

module.exports = { sendVerificationEmail, sendSubscriptionDebitNotification };