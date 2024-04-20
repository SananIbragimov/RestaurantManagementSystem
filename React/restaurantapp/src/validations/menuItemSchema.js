import * as Yup from "yup";

export const menuItemSchema = Yup.object().shape({
  menuId: Yup.number().required("Required!").typeError("Menu must be selected!"),
  productId: Yup.number().required("Required!").typeError("Product must be selected!"),
  promotionalPrice: Yup.string()
  .nullable()
});
