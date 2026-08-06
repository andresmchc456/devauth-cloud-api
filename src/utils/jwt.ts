import jwt from 'jsonwebtoken';

interface TokenPayload {
  userId: string;
  role: string;
}

// Genera tanto el Access Token (15 min) como el Refresh Token (7 días)
export const generateTokens = (payload: TokenPayload) => {
  const accessToken = jwt.sign(
    payload,
    process.env.JWT_SECRET || 'fallback_secret',
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    payload,
    process.env.JWT_SECRET || 'fallback_refresh_secret',
    { expiresIn: '7d' }
  );
  return { accessToken, refreshToken };
};