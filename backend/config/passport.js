const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");

// ✅ Serialize user (store user ID in session)
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// ✅ Deserialize user (retrieve user from session)
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// 🟢 Local Strategy (Email & Password Login)
passport.use(
  new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      const user = await User.findOne({ email }).select("+password");
      if (!user) return done(null, false, { message: "Invalid credentials" });

      const isMatch = await user.matchPassword(password);
      if (!isMatch) return done(null, false, { message: "Invalid credentials" });

      user.lastLogin = Date.now();
      await user.save();
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

// 🟢 Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL, // Uses .env variable
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          user.lastLogin = Date.now();
          await user.save();
          return done(null, user);
        }

        // Ensure email exists before proceeding
        const email = profile.emails?.[0]?.value || null;
        if (!email) return done(new Error("No email provided by Google"), null);

        user = await User.findOne({ email });
        if (user) {
          user.googleId = profile.id;
          user.lastLogin = Date.now();
          await user.save();
          return done(null, user);
        }

        user = await User.create({
          name: profile.displayName,
          email,
          googleId: profile.id,
          profileImage: profile.photos?.[0]?.value || null, // Handle missing image
          role: "user",
          lastLogin: Date.now(),
        });

        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

// 🟢 GitHub OAuth Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL, // Uses .env variable
      scope: ["user:email"], // Request email access
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ githubId: profile.id });

        if (user) {
          user.lastLogin = Date.now();
          await user.save();
          return done(null, user);
        }

        // Get primary email or create a fallback
        const email = profile.emails?.[0]?.value || `${profile.username}@github.com`;

        user = await User.findOne({ email });
        if (user) {
          user.githubId = profile.id;
          user.lastLogin = Date.now();
          await user.save();
          return done(null, user);
        }

        user = await User.create({
          name: profile.displayName || profile.username,
          email,
          githubId: profile.id,
          profileImage: profile.photos?.[0]?.value || null, // Handle missing image
          role: "user",
          lastLogin: Date.now(),
        });

        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

module.exports = passport;
