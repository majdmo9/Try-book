/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
  env: {
    API_KEY: "AIzaSyDTzuNDfZV22yzcQN-AnTaBqBLtMAcc4pA",
    AUTH_DOMAIN: "trybook-f2afd.firebaseapp.com",
    PROJECTID: "trybook-f2afd",
    STORAGE_BUCKET: "trybook-f2afd.appspot.com",
    MESSAGING_SENDER_ID: "668307558777",
    APP_ID: "1:668307558777:web:05549baa44c43723db1fa8",
    MEASUREMENT_ID: "G-RYMKKN0HLW",
  },
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "via.placeholder.com",
      "firebasestorage.googleapis.com",
      "image.pngaaa.com",
      "cdn.pixabay.com",
    ],
  },
};
