import { MethodShowcase } from "../../components/MethodShowcase";
import { methodsBySlug } from "../method-data";

export default function ThreatRangeMethodPage() {
  return <MethodShowcase method={methodsBySlug.threatrange} />;
}
