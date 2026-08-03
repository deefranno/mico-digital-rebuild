import { CallToAction } from "@/components/shared/CallToAction";
import { images } from "@/data/images";
import { homeCta } from "@/data/site";

/** Closing full-width call to action: "Your Future Starts at Mico." */
export function FinalCTA() {
  return <CallToAction cta={homeCta} image={images.graduation} />;
}
