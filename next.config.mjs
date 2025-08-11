import createNextIntlPlugin from "next-intl/plugin";
import { withContentlayer } from "next-contentlayer2";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.js");

export default withContentlayer(
  withNextIntl({
    // any other Next.js config
  })
);
