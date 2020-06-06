export const checkAuth = (history, isAuthenticated) => {

  if (!isAuthenticated) {

    history.push('/login');
    return false;

  }

  return true;

};
export const checkUnAuth = (history, isAuthenticated) => {

  if (isAuthenticated) {

    history.push('/');
    return true;

  }

  return false;

};
