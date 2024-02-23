export const emailValidation = {
  required: "Email is required",
  pattern: {
    value:
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    message: "Email is invalid",
  },
};

export const passwordValidation = {
  required: "Password is required",
  minLength: {
    value: 6,
    message: "Password must be at least 6 characters long",
  },
  pattern: {
    value:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
    message:
      "Password must include at least one lowercase letter, one uppercase letter, one number, and one special character",
  },
};

export const OTPValidation = {
  required: "OTP is required",
  minLength: {
    value: 4,
    message: "OTP must be exactly 4 characters long",
  },
  maxLength: {
    value: 4,
    message: "OTP must be exactly 4 characters long",
  },
};

export const categoryNameValidation = {
  required: "Category Name is required",
  minLength: {
    value: 1,
    message: "Category Name must be at least 1 characters",
  },
  maxLength: {
    value: 50,
    message: "Category Name must not be more than 50 characters",
  },
  pattern: {
    value: /^[a-zA-Z0-9\s]+$/,
    message: "Category Name is invalid (only letters and numbers)",
  },
};

export const recipeNameValidation = {
  required: "Recipe Name is required",
  minLength: {
    value: 1,
    message: "Recipe Name must be at least 1 characters",
  },
  maxLength: {
    value: 50,
    message: "Recipe Name must not be more than 50 characters",
  },
  pattern: {
    value: /^[a-zA-Z0-9\s]+$/,
    message: "Recipe Name is invalid (only letters and numbers)",
  },
};

export const recipeDescriptionValidation = {
  required: "Description is required",
  minLength: {
    value: 1,
    message: "Description must be at least 1 characters",
  },
  maxLength: {
    value: 500,
    message: "Description must not be more than 500 characters",
  },
};

export const recipePriceValidation = {
  required: "Price is required",
  min: {
    value: 1,
    message: "Price must be at least 1",
  },
};

export const recipeCategoriesValidation = {
  required: "Category is required",
};

export const recipeTagsValidation = {
  required: "Tag is required",
};
