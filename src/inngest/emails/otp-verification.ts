interface OtpEmailParams {
  name: string
  code: string
  expiresInMinutes: number
}

export function otpVerificationEmail({
  name,
  code,
  expiresInMinutes,
}: OtpEmailParams): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Vérification de votre compte</title>
</head>
<body style="margin:0;padding:0;background-color:#fafafa;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#fafafa;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:480px;">
          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="background-color:#18181b;padding:6px;border-radius:4px;">
                    <div style="width:8px;height:8px;background-color:#fafafa;border-radius:2px;"></div>
                  </td>
                  <td style="padding-left:10px;">
                    <span style="font-size:20px;font-weight:700;color:#18181b;letter-spacing:-0.02em;">Deploy</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background-color:#ffffff;border:1px solid #e4e4e7;border-radius:12px;padding:40px 32px;">
              <!-- Title -->
              <h1 style="margin:0 0 8px;font-size:20px;font-weight:600;color:#18181b;text-align:center;">
                Vérifiez votre adresse email
              </h1>
              <p style="margin:0 0 24px;font-size:14px;color:#71717a;text-align:center;line-height:1.5;">
                Bonjour ${name},<br />
                Voici votre code de vérification pour activer votre compte Deploy.
              </p>

              <!-- OTP Code -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td align="center" style="padding:0 0 24px;">
                    <div style="background-color:#fafafa;border:1px solid #e4e4e7;border-radius:8px;padding:16px 0;display:inline-block;">
                      <span style="font-size:32px;font-weight:700;color:#18181b;letter-spacing:8px;font-family:'Courier New',monospace;">
                        ${code}
                      </span>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Expiry notice -->
              <p style="margin:0 0 0;font-size:13px;color:#a1a1aa;text-align:center;line-height:1.5;">
                Ce code expire dans <strong style="color:#71717a;">${expiresInMinutes} minutes</strong>.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 0;">
              <p style="margin:0;font-size:12px;color:#a1a1aa;text-align:center;line-height:1.5;">
                Vous n'avez pas demandé ce code ? Ignorez simplement cet email.<br />
                Votre compte ne sera pas créé tant que le code n'est pas vérifié.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}
