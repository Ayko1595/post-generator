const jwtSecret = process.env.JWT_SECRET;
const clientId = process.env.CLIENT_ID;
const issuer = process.env.ISSUER;
const audience = process.env.AUDIENCE;
const serverPort = process.env.PORT || 3000;

module.exports = {
	claims: {
		expiresIn: "1h",
		issuer: issuer,
		audience: audience,
	},
	secret: jwtSecret,
	clientId: clientId,
	port: serverPort,
};
