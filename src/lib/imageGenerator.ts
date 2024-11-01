import domtoimage from 'dom-to-image-more';
import html2canvas from 'html2canvas';

const SCALE_FACTOR = 3;
const FALLBACK_SCALE = 4;

async function generateWithDomToImage(element: HTMLElement): Promise<Blob> {
  const width = element.offsetWidth * SCALE_FACTOR;
  const height = element.offsetHeight * SCALE_FACTOR;

  return domtoimage.toBlob(element, {
    quality: 1.0,
    bgcolor: '#fff',
    width,
    height,
    style: {
      transform: `scale(${SCALE_FACTOR})`,
      'transform-origin': 'top left'
    },
    filter: (node: Node) => {
      if (node instanceof HTMLInputElement && !node.matches(':focus')) {
        return false;
      }
      return true;
    },
  });
}

async function generateWithHtml2Canvas(element: HTMLElement): Promise<Blob> {
  const canvas = await html2canvas(element, {
    scale: FALLBACK_SCALE,
    useCORS: true,
    allowTaint: true,
    backgroundColor: '#ffffff',
    logging: false,
    onclone: (clonedDoc) => {
      const inputs = clonedDoc.getElementsByTagName('input');
      Array.from(inputs).forEach(input => {
        if (input.parentElement) {
          const span = clonedDoc.createElement('span');
          span.textContent = input.value;
          span.className = input.className;
          input.parentElement.replaceChild(span, input);
        }
      });

      const styleElement = clonedDoc.createElement('style');
      styleElement.textContent = `
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        .bg-gradient-to-r { background: linear-gradient(to right, var(--tw-gradient-stops)) !important; }
        .bg-gradient-to-br { background: linear-gradient(to bottom right, var(--tw-gradient-stops)) !important; }
        .bg-gradient-to-b { background: linear-gradient(to bottom, var(--tw-gradient-stops)) !important; }
        .from-red-500 { --tw-gradient-from: #ef4444 !important; }
        .to-amber-500 { --tw-gradient-to: #f59e0b !important; }
        .from-blue-500 { --tw-gradient-from: #3b82f6 !important; }
        .to-purple-500 { --tw-gradient-to: #a855f7 !important; }
        .from-emerald-50 { --tw-gradient-from: #ecfdf5 !important; }
        .to-blue-50 { --tw-gradient-to: #eff6ff !important; }
        .blur-2xl { filter: blur(40px) !important; }
        .backdrop-blur-xl { backdrop-filter: blur(24px) !important; }
        .backdrop-blur-sm { backdrop-filter: blur(4px) !important; }
        .bg-white\\/95 { background-color: rgb(255 255 255 / 0.95) !important; }
        .shadow-xl { box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1) !important; }
      `;
      clonedDoc.head.appendChild(styleElement);
    }
  });

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error('Failed to create image blob'));
      }
    }, 'image/png', 1.0);
  });
}

export async function generateImage(element: HTMLElement): Promise<Blob> {
  try {
    return await generateWithDomToImage(element);
  } catch (error) {
    console.warn('DOM-to-image failed, falling back to html2canvas', error);
    return generateWithHtml2Canvas(element);
  }
}