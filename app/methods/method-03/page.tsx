import { MethodShowcase } from "../../components/MethodShowcase";
import { methodsBySlug } from "../method-data";

export default function MethodThreePage() {
  return <MethodShowcase method={methodsBySlug.threatrange} />;
}
