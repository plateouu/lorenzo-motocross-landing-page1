
export const openDisguisedTab = (targetUrl: string) => {
  if (!targetUrl) return;

  const width = window.screen.availWidth;
  const height = window.screen.availHeight;

  // Open generic popup
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
  const icon = "/desmos/favicon.ico"; // Ensure this files exist or use absolute URL if needed

  try {
    // 1. Set Title
    win.document.title = title;

    // 2. Set Favicon
    const link = win.document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/x-icon';
    link.href = window.location.origin + icon; // Use local origin to serve the file if it exists
    win.document.head.appendChild(link);

    // 3. Style Body
    win.document.body.style.margin = '0';
    win.document.body.style.height = '100vh';
    win.document.body.style.overflow = 'hidden';
    win.document.body.style.backgroundColor = '#000';

    // 4. Create Iframe
    const iframe = win.document.createElement('iframe');
    iframe.style.border = 'none';
    iframe.style.width = '100vw';
    iframe.style.height = '100vh';
    iframe.src = targetUrl;
    iframe.allow = "fullscreen; camera; microphone; display-capture; clipboard-read; clipboard-write; autoplay";

    win.document.body.appendChild(iframe);

    // 5. Title Enforcement (Anti-drift)
    const script = win.document.createElement('script');
    script.textContent = `
      setInterval(() => {
        if (document.title !== "${title}") {
          document.title = "${title}";
        }
      }, 1000);
      window.onbeforeunload = function() {
        return "Are you sure you want to leave Desmos?";
      };
    `;
    win.document.body.appendChild(script);

  } catch (e) {
    console.error("Failed to disguise tab:", e);
  }
};
