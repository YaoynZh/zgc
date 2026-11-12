import { MethodShowcase } from "../../components/MethodShowcase";
import { methodsBySlug } from "../method-data";

export default function DriveArenaMethodPage() {
  return <MethodShowcase method={methodsBySlug.drivearena} />;
}
