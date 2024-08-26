const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

const validatePassword = (password: string) => {
  return password.length >= 8;
};

const validateTodoInput = (title: string, description: string) => {
  return title.trim().length > 0 && description.trim().length > 0;
};

export { validateEmail, validatePassword, validateTodoInput };
