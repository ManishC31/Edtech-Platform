export default `
<!-- Verification email HTML -->
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Verify your email</title>
  <style>
    /* Basic resets for many email clients */
    body { margin:0; padding:0; background:#f5f7fa; font-family: Arial, Helvetica, sans-serif; }
    table { border-collapse:collapse; }
    img { border:0; display:block; }
    .container { width:100%; max-width:600px; margin:0 auto; }
    .card { background:#ffffff; border-radius:8px; padding:24px; }
    .btn { display:inline-block; padding:12px 20px; text-decoration:none; border-radius:6px; font-weight:600; }
    .muted { color:#6b7280; font-size:14px; }
    .preheader { display:none !important; visibility:hidden; opacity:0; color:transparent; height:0; width:0; }
    @media screen and (max-width:420px) {
      .card { padding:16px; }
      .btn { width:100%; display:block; text-align:center; }
    }
  </style>
</head>
<body>
  <!-- Preheader text: shown in inbox preview -->
  <span class="preheader">Confirm your email to finish registration for EduJunction.</span>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" class="container" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td style="text-align:left; padding-bottom:16px;">
              <!-- Header / Brand -->
              <!--<img src="https://your-cdn.example.com/logo.png" alt="EduJunction" width="140" style="display:block;" />-->
            </td>
          </tr>

          <tr>
            <td class="card" style="padding:24px;">
              <h2 style="margin:0 0 8px 0; font-size:20px; color:#111827;">Verify your email</h2>
              <p class="muted" style="margin:0 0 18px 0;">
                Thanks for registering. Click the button below to confirm your email and activate your account.
              </p>

              <!-- CTA button: replace {{VERIFY_URL}} -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:18px 0;">
                <tr>
                  <td align="center">
                    <a href="{{VERIFY_URL}}" class="btn" style="background:#2563eb; color:#ffffff;">
                      Verify email
                    </a>
                  </td>
                </tr>
              </table>

              <p class="muted" style="margin:0 0 12px 0; font-size:13px;">
                If the button does not work, copy and paste this link into your browser:
              </p>

              <p style="word-break:break-all; font-size:13px; margin:0 0 18px 0;">
                <a href="{{VERIFY_URL}}" style="color:#2563eb; text-decoration:none;">{{VERIFY_URL}}</a>
              </p>

              <p class="muted" style="margin:0 0 8px 0; font-size:13px;">
                This link will expire in 24 hours.
              </p>

              <hr style="border:none; border-top:1px solid #e6eaf0; margin:18px 0;" />

              <p class="muted" style="font-size:13px; margin:0;">
                If you did not create an account, ignore this email.
              </p>
            </td>
          </tr>

          <tr>
            <td style="text-align:center; padding:14px 0; font-size:12px; color:#9aa0a6;">
              Edtech Portal · 123 Learning St · City, Country
              <br/>
              <a href="mailto:support@edujunction.example" style="color:#9aa0a6; text-decoration:none;">developermanish31@gmail.com</a>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
