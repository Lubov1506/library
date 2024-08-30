import * as yup from "yup";

export const bookFormScheme = yup
  .object({
    title: yup
      .string()
      .min(2, "Title must be at least 2 characters long")
      .max(64, "Title must be at most 64 characters long")
      .required("Title is required"),
    author: yup
      .string()
      .min(2, "Author must be at least 2 characters long")
      .max(32, "Author must be at most 32 characters long")
      .required("Author is required"),
    isbn: yup
      .string()
      .matches(/^978-\d-\d{1,5}-\d{1,7}-\d$/, 'Invalid format')
      .required("ISBN is required"),
  })
  .required();
