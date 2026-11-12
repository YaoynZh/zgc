import { MethodShowcase } from "../../components/MethodShowcase";
import { methodsBySlug } from "../method-data";

export default function MethodTwoPage() {
  return <MethodShowcase method={methodsBySlug.drivearena} />;
}
