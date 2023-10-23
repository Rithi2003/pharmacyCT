// Create and send token and save in the cookie.
const sendToken = (user, statusCode, res) => {
    console.log(process.env.COOKIE_EXPIRES_TIME)
    // Create Jwt token
    const token = user.getJwtToken();

    // Options for cookie
    const options = {
        expiresIn: '24h',
        httpOnly: true
    }

    console.log(options)
    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token,
        user
    })

}

module.exports = sendToken;