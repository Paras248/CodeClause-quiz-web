const cookieToken = async (user, res) => {
    const token = await user.getJwtToken();
    const options = {
        expiresIn: new Date(Date.now() + 2 * 1000 * 60 * 60 * 24),
        httpOnly: true,
    };

    user.password = undefined;

    res.cookie("token", token, options).json({
        success: true,
        token,
        user,
    });
};

module.exports = cookieToken;
