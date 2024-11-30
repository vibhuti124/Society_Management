const authService = require('../services/authService');
const User = require('../models/Chairman')
const generateToken = require('../utils/generateToken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const otpMap = new Map();

exports.register = async (req, res) => {
    try {
      const chairman = await authService.registerChairman(req.body);
      const token = await authService.generateToken(chairman.id);
      res.json({ token });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };

  exports.login = async (req, res) => {
    try {
      const { emailorphone, password } = req.body;
      const chairman = await authService.loginChairman(emailorphone, password);
      const token = await authService.generateToken(chairman.id);
      res.json({ token });
    } catch (err) {
      console.error(err.message);
      res.status(400).json({ msg: err.message });
    }
  };


// Sending OTP via email

exports.sendOTP = async (req, res) => {
  const { emailorphone } = req.body; 

  try {
      const user = await User.findOne({
          $or: [{ email: emailorphone }, { phone: emailorphone }]
      });

      if (!user) {
          return res.status(400).json({ message: 'User not found' });
      }
      const otp = crypto.randomInt(100000, 999999).toString();

      otpMap.set(emailorphone, { otp, expiresIn: Date.now() + 15 * 60 * 1000 });

      await sendEmail(user.email, otp); 

      res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

const sendEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: 'vibhuti.kothiya259@gmail.com', 
          pass: 'pqrtizbunjwrpzuz' 
      }
  });

  const mailOptions = {
      from: 'vibhuti.kothiya259@gmail.com',
      to: email,
      subject: 'DashStack Password Reset OTP',
      text: `Your OTP is: ${otp}`
  };

  await transporter.sendMail(mailOptions);
};

//verify otp
exports.verifyOTP = async (req, res) => {
    const { emailorphone, otp } = req.body;

    try {
        const storedOTP = otpMap.get(emailorphone);
        if (!storedOTP || storedOTP.otp !== otp || storedOTP.expiresIn < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        otpMap.delete(emailorphone);

        res.status(200).json({ message: 'OTP verified successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// reset password
exports.resetPassword = async (req, res) => {
    const { emailorphone, newPassword } = req.body;

    try {
        const user = await User.findOne({
            $or: [{ email: emailorphone }, { phone: emailorphone }]
        });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};