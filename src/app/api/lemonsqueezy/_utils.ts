const LICENSE_API_BASE = "https://api.lemonsqueezy.com/v1/licenses";

type LemonLicenseRequest = "activate" | "validate" | "deactivate";

export type LemonLicenseResponse = {
  activated?: boolean;
  valid?: boolean;
  error?: string;
  license_key?: {
    id?: number;
    status?: string;
    key?: string;
    activation_limit?: number;
    activation_usage?: number;
    expires_at?: string | null;
  };
  instance?: {
    id?: string;
    name?: string;
    created_at?: string;
  };
  meta?: {
    store_id?: number;
    order_id?: number;
    order_item_id?: number;
    product_id?: number;
    product_name?: string;
    variant_id?: number;
    variant_name?: string;
  };
};

export function jsonError(message: string, status = 400) {
  return Response.json({ ok: false, error: message }, { status });
}

export function getAllowedVariantIds(): Set<string> {
  return new Set(
    [
      process.env.LEMONSQUEEZY_MONTHLY_VARIANT_ID,
      process.env.LEMONSQUEEZY_YEARLY_VARIANT_ID,
    ]
      .filter(Boolean)
      .map(String)
  );
}

export function isAllowedVariant(data: LemonLicenseResponse) {
  const allowedVariantIds = getAllowedVariantIds();
  const variantId = data.meta?.variant_id;

  if (allowedVariantIds.size === 0 || variantId === undefined) {
    return false;
  }

  return allowedVariantIds.has(String(variantId));
}

export function normalizeLicense(data: LemonLicenseResponse) {
  return {
    licenseStatus: data.license_key?.status ?? "unknown",
    expiresAt: data.license_key?.expires_at ?? null,
    activationLimit: data.license_key?.activation_limit ?? null,
    activationUsage: data.license_key?.activation_usage ?? null,
    instance: data.instance
      ? {
          id: data.instance.id ?? "",
          name: data.instance.name ?? "",
        }
      : null,
    product: {
      id: data.meta?.product_id ?? null,
      name: data.meta?.product_name ?? "",
    },
    variant: {
      id: data.meta?.variant_id ?? null,
      name: data.meta?.variant_name ?? "",
    },
  };
}

export function isActiveLicense(data: LemonLicenseResponse) {
  return (
    data.license_key?.status === "active" &&
    isAllowedVariant(data) &&
    !data.error
  );
}

export async function lemonLicenseRequest(
  action: LemonLicenseRequest,
  params: Record<string, string>
) {
  const body = new URLSearchParams(params);
  const response = await fetch(`${LICENSE_API_BASE}/${action}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
    cache: "no-store",
  });

  const data = (await response
    .json()
    .catch(() => ({}))) as LemonLicenseResponse;

  return {
    ok: response.ok,
    status: response.status,
    data,
  };
}
