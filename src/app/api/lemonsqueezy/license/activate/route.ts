import {
  isActiveLicense,
  jsonError,
  lemonLicenseRequest,
  normalizeLicense,
} from "../../_utils";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ActivateRequest = {
  licenseKey?: string;
  instanceName?: string;
};

export async function POST(request: Request) {
  let payload: ActivateRequest;

  try {
    payload = (await request.json()) as ActivateRequest;
  } catch {
    return jsonError("Invalid JSON body.");
  }

  const licenseKey = payload.licenseKey?.trim();
  const instanceName = payload.instanceName?.trim();

  if (!licenseKey || licenseKey.length < 8) {
    return jsonError("Enter a valid Lemon Squeezy license key.");
  }

  if (!instanceName || instanceName.length < 3) {
    return jsonError("Missing browser instance name.");
  }

  const result = await lemonLicenseRequest("activate", {
    license_key: licenseKey,
    instance_name: instanceName,
  });

  if (!result.ok) {
    return jsonError(
      result.data.error || "Lemon Squeezy rejected this license key.",
      result.status
    );
  }

  if (!result.data.activated || !isActiveLicense(result.data)) {
    return jsonError(
      result.data.error || "This license is not active for SafeJSON Pro.",
      403
    );
  }

  const normalized = normalizeLicense(result.data);

  if (!normalized.instance?.id) {
    return jsonError("Lemon Squeezy did not return an activation instance.", 502);
  }

  return Response.json({
    ok: true,
    valid: true,
    activated: true,
    validatedAt: new Date().toISOString(),
    ...normalized,
  });
}
