import * as Yup from "yup";

export const partnerVisitorSchema = Yup.object().shape({
  fullname: Yup.string().required("Full name is required"),
  partner: Yup.string().required("partner name is required"),
  phone: Yup.string()
    .required("Phone is required")
    .matches(
      /^(\+\d{1,3}[-.]?)?\d{3}[-.]?\d{3}[-.]?\d{4}$/,
      "Please enter a valid phone number"
    )
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must not exceed 15 digits"),
  email: Yup.string()
    .email("Email should be in a valid email format")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email should have a valid domain"
    )
    .required("Email is required"),
});
