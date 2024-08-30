export const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization']

  if (!authHeader) {
    return res.status(401).send('Access denied. No credentials sent.')
  }

  const validToken = 'mySecretToken';

  if (authHeader !== validToken) {
    return res.status(403).send('Access denied. Invalid credentials.')
  }

  req.user = { permissions: ['createPost', 'readPost', 'deletePost', 'updatePost'] }
  next();
}