export const isManager = (req, res, next) => {
    if (req.user && req.user.role === 'manager') {
      next();
    } else {
      res.status(403).json({ error: 'Access denied: Managers only' });
    }
  };
  
  export const isEmployee = (req, res, next) => {
    if (req.user && req.user.role === 'employee') {
      next();
    } else {
      res.status(403).json({ error: 'Access denied: Employees only' });
    }
  };
  
  export const isClient = (req, res, next) => {
    if (req.user && req.user.role === 'client') {
      next();
    } else {
      res.status(403).json({ error: 'Access denied: Clients only' });
    }
  };
  
  // Optional: allow multiple roles
  export const allowRoles = (...roles) => {
    return (req, res, next) => {
      if (req.user && roles.includes(req.user.role)) {
        next();
      } else {
        res.status(403).json({ error: `Access denied: Only [${roles.join(', ')}] allowed` });
      }
    };
  };
  