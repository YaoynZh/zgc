import { MethodShowcase } from "../../components/MethodShowcase";
import { methodsBySlug } from "../method-data";

export default function ScengeMethodPage() {
  return <MethodShowcase method={methodsBySlug.scenge} />;
}
