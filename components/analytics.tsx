import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import type { SITE_SETTINGS_QUERY_RESULT } from "@/sanity.types";

export function Analytics({
  settings,
}: {
  settings: SITE_SETTINGS_QUERY_RESULT | null;
}) {
  return (
    <>
      {settings?.gaMeasurementId && (
        <GoogleAnalytics gaId={settings.gaMeasurementId} />
      )}
      {settings?.gtmId && <GoogleTagManager gtmId={settings.gtmId} />}
    </>
  );
}
