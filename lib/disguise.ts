
export const openDisguisedTab = (targetUrl: string) => {
  if (!targetUrl) return;

  const width = window.screen.availWidth;
  const height = window.screen.availHeight;

  // Open a new window
  const win = window.open(
    'about:blank',
    '_blank',
    `popup=yes,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=${width},height=${height},left=0,top=0`
  );

  if (!win) {
    alert("Popup blocked! Please allow popups for this site.");
    return;
  }

  // Define Desmos assets
  const title = "Desmos | Graphing Calculator";
  const icon = "/desmos/favicon.ico";

  try {
    // Write full HTML content to the new window
    // We use a comprehensive HTML structure to ensure better compatibility
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <link rel="icon" type="image/x-icon" href="${window.location.origin + icon}">
        <style>
          body, html { margin: 0; padding: 0; height: 100%; overflow: hidden; background-color: #000; }
          iframe { border: none; width: 100%; height: 100%; display: block; }
        </style>
      </head>
      <body>
        <iframe 
          src="${targetUrl}" 
          allow="fullscreen; camera; microphone; display-capture; clipboard-read; clipboard-write; autoplay; encrypted-media; picture-in-picture; self"
          sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation allow-top-navigation-by-user-activation"
        ></iframe>
        <script>
          // Title Enforcement
          setInterval(() => {
            if (document.title !== "${title}") {
              document.title = "${title}";
            }
          }, 1000);
          
          window.onbeforeunload = function() {
            return "Are you sure you want to leave Desmos?";
          };
        </script>
      </body>
      </html>
    `;

    win.document.write(htmlContent);
    win.document.close(); // Important for some browsers to finish loading

  } catch (e) {
    console.error("Failed to disguise tab:", e);
    // Fallback: Just navigate the window
    win.location.href = targetUrl;
  }
};
