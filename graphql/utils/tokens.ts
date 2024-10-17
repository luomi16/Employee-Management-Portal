import jwt from "jsonwebtoken";

// 生成带有过期时间的 JWT 令牌
export const generateToken = (
  email: string,
  name: string,
  secret: string,
  expiration = "3h"
) => {
  return jwt.sign(
    { email, name }, // 载荷
    secret, // 用于签名令牌的密钥
    { expiresIn: expiration } // 令牌过期时间
  );
};

// 验证令牌
export const verifyToken = (token: string, secret: string) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
};
