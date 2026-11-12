import { MethodShowcase } from "../../components/MethodShowcase";
import { methodsBySlug } from "../method-data";

export default function ChatSceneMethodPage() {
  return <MethodShowcase method={methodsBySlug.chatscene} />;
}
