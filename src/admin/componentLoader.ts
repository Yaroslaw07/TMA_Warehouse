import { ComponentLoader } from "adminjs";

const componentLoader = new ComponentLoader();

componentLoader.override("LoggedIn", "./components/logged.tsx");

const Components = {
  OrderItemForm: componentLoader.add(
    "OrderItemForm",
    "./components/order-item-form.tsx"
  ),
};

export { componentLoader, Components };
