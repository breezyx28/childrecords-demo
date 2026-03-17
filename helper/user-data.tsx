export const saveUserData = (data: any) => {
  try {
    setTimeout(() => {
      localStorage.setItem("user_data", JSON.stringify(data));
    }, 1000);
    return true;
  } catch (error) {
    return false;
  }
};

export const getUserData = () => {
  const data = localStorage.getItem("user_data");
  return data ? JSON.parse(data) : null;
};

export const removeUserData = () => {
  localStorage.removeItem("user_data");
};
