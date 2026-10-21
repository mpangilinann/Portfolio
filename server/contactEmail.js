function escapeHtml(value) {
  return value.replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character]);
}

export function createContactEmail({ name, email, message }, submittedAt) {
  const time = new Date(submittedAt).toISOString();
  const safe = { name: escapeHtml(name), email: escapeHtml(email), message: escapeHtml(message), time: escapeHtml(time) };
  return {
    subject: `Portfolio message from ${name}`,
    text: `New portfolio message\n\nName: ${name}\nEmail: ${email}\nSubmitted: ${time} (UTC)\n\nMessage:\n${message}`,
    html: `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>New portfolio message</title></head>
<body style="margin:0;padding:0;background:#f4f4f4;color:#171717;font-family:Arial,Helvetica,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;"><tr><td align="center" style="padding:32px 16px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;border:1px solid #dedede;">
<tr><td style="padding:32px 28px;background:#171717;color:#ffffff;">
<p style="margin:0 0 12px;font-size:11px;letter-spacing:2px;text-transform:uppercase;">Mikko Pangilinan Portfolio</p>
<h1 style="margin:0;font-size:28px;line-height:1.25;">New portfolio message</h1></td></tr>
<tr><td style="padding:28px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;line-height:1.6;table-layout:fixed;">
<tr><td style="padding-bottom:16px;overflow-wrap:anywhere;word-break:break-word;"><strong>Name</strong><br>${safe.name}</td></tr>
<tr><td style="padding-bottom:16px;overflow-wrap:anywhere;word-break:break-word;"><strong>Email</strong><br>${safe.email}</td></tr>
<tr><td style="padding-bottom:24px;"><strong>Submitted (UTC)</strong><br>${safe.time}</td></tr>
</table>
<h2 style="margin:0;padding-top:24px;border-top:1px solid #dedede;font-size:16px;">Message</h2>
<p style="margin:16px 0 0;font-size:16px;line-height:1.7;overflow-wrap:anywhere;word-break:break-word;">${safe.message.replace(/\n/g, "<br>")}</p>
</td></tr></table></td></tr></table></body></html>`,
  };
}
