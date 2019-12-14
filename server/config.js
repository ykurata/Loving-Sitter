module.exports = {
  mongodb: {
    uri: "mongodb://localhost/lovingSitter"
  },
  AWS: {
    SECRET_ACCESS: process.env.AWS_SECRET_KEY,
    ACCESS_KEY: process.env.AWS_ACCESS_KEY
  }
};
