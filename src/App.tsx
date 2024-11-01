import { useRef, useState } from 'react';
import { PlanCard } from './components/PlanCard';
import { useImageDownload } from './hooks/useImageDownload';
import { Loader2, Download, AlertCircle } from 'lucide-react';
import { Slider } from './components/ui/slider';

const defaultPlanDetails = {
  phoneNumber: "050786787",
  planName: "Freedom Data Plan 500 Flexi",
  localData: "Unlimited",
  speed: "Full Speed",
  speedOriginal: "Up to 20Mbps",
  speedDuration: "12 months",
  flexiMinutes: "1500",
  roamingData: "10GB",
  promotionTitle: "Exclusive Promotion",
  promotionOffer1: "25% off for 6 months**",
  promotionOffer2: "Choose your own gift*",
  price: "500",
  vatText: "5% VAT excluded",
  commitmentText: "12-month commitment",
  goldNumberLabel: "Gold number",
  localDataLabel: "Local Data",
  speedLabel: "Speed",
  flexiMinutesLabel: "Flexi minutes",
  roamingDataLabel: "Roaming Data",
  numberType: "gold" as const
};

function App() {
  const posterRef = useRef<HTMLDivElement>(null);
  const { downloadImage, status } = useImageDownload();
  
  // Size controls
  const [headerScale, setHeaderScale] = useState(1);
  const [planNameScale, setPlanNameScale] = useState(1);
  const [featuresScale, setFeaturesScale] = useState(1);
  const [promoScale, setPromoScale] = useState(1);
  const [footerScale, setFooterScale] = useState(1);
  const [logoScale, setLogoScale] = useState(1);
  
  // Color controls (hue rotation in degrees)
  const [headerHue, setHeaderHue] = useState(0);
  const [planNameHue, setPlanNameHue] = useState(0);
  const [featuresHue, setFeaturesHue] = useState(0);
  const [promoHue, setPromoHue] = useState(0);
  const [footerHue, setFooterHue] = useState(0);

  const handleDownload = () => {
    downloadImage(posterRef);
  };

  const buttonContent = {
    idle: (
      <>
        <Download className="w-4 h-4 mr-2" />
        Download Poster
      </>
    ),
    generating: (
      <>
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        Generating Image...
      </>
    ),
    downloading: (
      <>
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        Downloading...
      </>
    ),
    error: (
      <>
        <AlertCircle className="w-4 h-4 mr-2" />
        Failed, Try Again
      </>
    ),
  };

  const getHuePreviewStyle = (hue: number) => ({
    background: `linear-gradient(to right, 
      hsl(${hue}, 100%, 50%) 0%,
      hsl(${(hue + 60) % 360}, 100%, 50%) 33%,
      hsl(${(hue + 120) % 360}, 100%, 50%) 66%,
      hsl(${(hue + 180) % 360}, 100%, 50%) 100%
    )`,
    height: '4px',
    borderRadius: '2px',
    marginTop: '4px'
  });

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-50 via-gray-100 to-gray-200 py-4 px-2">
      <div className="container mx-auto flex flex-col items-center gap-4">
        <div ref={posterRef} className="flex items-center justify-center p-4">
          <PlanCard 
            details={defaultPlanDetails}
            scales={{
              header: headerScale,
              planName: planNameScale,
              features: featuresScale,
              promo: promoScale,
              footer: footerScale,
              logo: logoScale
            }}
            hues={{
              header: headerHue,
              planName: planNameHue,
              features: featuresHue,
              promo: promoHue,
              footer: footerHue
            }}
          />
        </div>
        
        <div className="w-full max-w-[600px] space-y-6 bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-700">Size Adjustments</h3>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs text-gray-600">Header Size</label>
                <Slider value={[headerScale * 100]} onValueChange={([v]) => setHeaderScale(v / 100)} min={50} max={150} step={1} />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-gray-600">Plan Name Size</label>
                <Slider value={[planNameScale * 100]} onValueChange={([v]) => setPlanNameScale(v / 100)} min={50} max={150} step={1} />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-gray-600">Features Size</label>
                <Slider value={[featuresScale * 100]} onValueChange={([v]) => setFeaturesScale(v / 100)} min={50} max={150} step={1} />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-gray-600">Promotion Size</label>
                <Slider value={[promoScale * 100]} onValueChange={([v]) => setPromoScale(v / 100)} min={50} max={150} step={1} />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-gray-600">Price Section Size</label>
                <Slider value={[footerScale * 100]} onValueChange={([v]) => setFooterScale(v / 100)} min={50} max={150} step={1} />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-gray-600">Logo Size</label>
                <Slider value={[logoScale * 100]} onValueChange={([v]) => setLogoScale(v / 100)} min={50} max={150} step={1} />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-700">Color Adjustments</h3>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs text-gray-600">Header Colors</label>
                <Slider value={[headerHue]} onValueChange={([v]) => setHeaderHue(v)} min={0} max={360} step={1} />
                <div style={getHuePreviewStyle(headerHue)} />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-gray-600">Plan Name Colors</label>
                <Slider value={[planNameHue]} onValueChange={([v]) => setPlanNameHue(v)} min={0} max={360} step={1} />
                <div style={getHuePreviewStyle(planNameHue)} />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-gray-600">Features Colors</label>
                <Slider value={[featuresHue]} onValueChange={([v]) => setFeaturesHue(v)} min={0} max={360} step={1} />
                <div style={getHuePreviewStyle(featuresHue)} />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-gray-600">Promotion Colors</label>
                <Slider value={[promoHue]} onValueChange={([v]) => setPromoHue(v)} min={0} max={360} step={1} />
                <div style={getHuePreviewStyle(promoHue)} />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-gray-600">Price Section Colors</label>
                <Slider value={[footerHue]} onValueChange={([v]) => setFooterHue(v)} min={0} max={360} step={1} />
                <div style={getHuePreviewStyle(footerHue)} />
              </div>
            </div>
          </div>
        </div>
        
        <button 
          onClick={handleDownload}
          disabled={status !== 'idle' && status !== 'error'}
          className={`
            w-full max-w-[380px] px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 
            hover:from-blue-700 hover:to-blue-900 text-white shadow-lg hover:shadow-xl 
            transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
            flex items-center justify-center
            ${status === 'error' ? 'from-red-600 to-red-800 hover:from-red-700 hover:to-red-900' : ''}
          `}
        >
          {buttonContent[status]}
        </button>

        <footer className="text-center text-sm text-gray-500 mt-8">
          Built with <span className="text-red-500">♥</span> by TAB
        </footer>
      </div>
    </div>
  );
}

export default App;