import jwt from "jsonwebtoken";

export const GenerateTokens = (userId) => {
    const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "7d",
    })
    return { accessToken };
}

export const setCookies = (res, accessToken) => {
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
}