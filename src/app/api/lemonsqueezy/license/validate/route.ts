import {
  isActiveLicense,
  jsonError,
  lemonLicenseRequest,
  normalizeLicense,
} from "../../_utils";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ValidateRequest = {
  licenseKey?: string;
  instanceId?: string;
};

export async function POST(request: Request) {
  let payload: ValidateRequest;

  try {
    payload = (await request.json()) as ValidateRequest;
  } catch {
    return jsonError("Invalid JSON body.");
  }

  const licenseKey = payload.licenseKey?.trim();
  const instanceId = payload.instanceId?.trim();

  if (!licenseKey || licenseKey.length < 8) {
    return jsonError("Missing Lemon Squeezy license key.");
  }

  if (!instanceId) {
    return jsonError("Missing activation instance.");
  }

  const result = await lemonLicenseRequest("validate", {
    license_key: licenseKey,
    instance_id: instanceId,
  });

  if (!result.ok) {
    return jsonError(
      result.data.error || "Could not validate this license key.",
      result.status
    );
  }

  const valid = Boolean(result.data.valid) && isActiveLicense(result.data);

  return Response.json({
    ok: true,
    valid,
    validatedAt: new Date().toISOString(),
    ...normalizeLicense(result.data),
  });
}
