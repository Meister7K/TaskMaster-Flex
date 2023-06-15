const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [
        /^[a-zA-Z0-9]+$/,
        "Username may only include letters and numbers.",
      ],
      validate: [
        {
          validator: (value) => {
            return value.length >= 3 && value.length <= 20;
          },
          message: "Username must be between 3 and 20 characters long.",
        },
      ],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
        "Please enter a valid email address.",
      ],
    },
    password: {
      type: String,
      required: true,
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&a-zA-Z\d])[a-zA-Z\d@$!%*#?&]+$/,
        "Password must contain at least one lowercase letter, one uppercase letter, and one number. Password may include special characters!",
      ],
      validate: [
        {
          validator: (value) => {
            return value.length >= 6 && value.length <= 20;
          },
          message: "Password must be between 6 and 20 characters long.",
        },
      ],
    },
    playerChar: {
      type: Schema.Types.ObjectId,
      ref: "playerCharacter",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("user", userSchema);

module.exports = User;
