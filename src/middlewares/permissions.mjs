const VALID_PERMISSIONS = ['createPost', 'readPost', 'deletePost', 'updatePost']

export const permissions = (requiredPermission) => (req, res, next) => {

  if (!VALID_PERMISSIONS.includes(requiredPermission)) {
    return res.status(400).send('Недопустимое разрешение.')
  }

  if (req.user && req.user.permissions && req.user.permissions.includes(requiredPermission)) {
    return next();
  } else {
    return res.status(403).send('Недостаточно прав доступа.')
  }
}