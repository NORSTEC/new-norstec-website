import type {Metadata} from "next";
import ClientCartPage from "@/app/cart/ClientCartPage";

export const metadata: Metadata = {
  title: "Cart | NORSTEC",
};

export default function CartPage() {
  return <ClientCartPage />;
}
