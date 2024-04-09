import * as Yup from "yup";

export const productSchema = Yup.object().shape({
  name: Yup.string()
    .required("Required!")
    .min(2, "Min length is 2!")
    .max(50, "Max length is 50!"),
  categoryId: Yup.number().required("Required!").typeError("Category must be selected!"),
  price: Yup.string()
  .required("Required!"),
  image: Yup.mixed()
});
