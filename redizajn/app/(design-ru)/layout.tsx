import "../globals.css";
import Koren from "@/components/design/Koren";

export default function Raspored({ children }: { children: React.ReactNode }) {
  return <Koren jezik="ru">{children}</Koren>;
}
