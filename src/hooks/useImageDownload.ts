import { useState, RefObject } from 'react';
import { generateImage } from '../lib/imageGenerator';
import { downloadBlob } from '../lib/downloadHelper';

export type DownloadStatus = 'idle' | 'generating' | 'downloading' | 'error';

export function useImageDownload() {
  const [status, setStatus] = useState<DownloadStatus>('idle');

  const downloadImage = async (elementRef: RefObject<HTMLElement>) => {
    if (!elementRef.current || status !== 'idle') return;
    
    try {
      setStatus('generating');
      const imageBlob = await generateImage(elementRef.current);
      
      setStatus('downloading');
      await downloadBlob(imageBlob, 'plan-poster.png');
      setStatus('idle');
    } catch (error) {
      console.error('Error generating image:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return { downloadImage, status };
}