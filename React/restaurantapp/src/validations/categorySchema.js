import * as Yup from "yup";

export const categorySchema = Yup.object().shape({
  name: Yup.string()
    .required("Required!")
    .min(2, "Min length is 2!")
    .max(50, "Max length is 50!"),
});
