export default {
  jwtSecret: process.env.JWT_SECRET,
  jwtExpirationInSeconds: parseInt(process.env.JWT_EXPIRATION_IN_SECONDS, 10),
}
