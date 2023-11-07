const environment = process.env.ENVIRONMENT;
let apiUrl;
if (environment === "prod") {
  apiUrl = process.env.PRODUCTION_URL;
} else {
  apiUrl = process.env.DEVELOPMENT_URL;
}


module.exports= apiUrl