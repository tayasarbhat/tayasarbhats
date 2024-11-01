import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader } from "./ui/card";
import { EditableText } from "./EditableText";
import { 
  Globe, 
  Gift, 
  Sparkles,
  Clock,
  Wifi,
  PhoneCall,
  Globe2
} from "lucide-react";

export type NumberType = 'gold' | 'silver' | 'silver-plus' | 'platinum';

export type PlanDetails = {
  phoneNumber: string;
  planName: string;
  localData: string;
  speed: string;
  speedOriginal: string;
  speedDuration: string;
  flexiMinutes: string;
  flexiMinutesOriginal: string;
  roamingData: string;
  promotionTitle: string;
  promotionOffer1: string;
  promotionOffer2: string;
  price: string;
  vatText: string;
  commitmentText: string;
  goldNumberLabel: string;
  localDataLabel: string;
  speedLabel: string;
  flexiMinutesLabel: string;
  roamingDataLabel: string;
  numberType: NumberType;
};

interface PlanCardProps {
  details: PlanDetails;
  onUpdate: (details: PlanDetails) => void;
  scales: {
    header: number;
    planName: number;
    features: number;
    promo: number;
    footer: number;
    logo: number;
  };
  hues: {
    header: number;
    planName: number;
    features: number;
    promo: number;
    footer: number;
  };
}

const numberTypeStyles = {
  platinum: {
    badge: "from-violet-200 to-fuchsia-200 text-fuchsia-800 hover:from-violet-300 hover:to-fuchsia-300",
    icon: "text-fuchsia-700",
    label: "Platinum Number"
  },
  gold: {
    badge: "from-amber-100 to-amber-200 text-amber-700 hover:from-amber-200 hover:to-amber-300",
    icon: "text-amber-600",
    label: "Gold Number"
  },
  "silver-plus": {
    badge: "from-slate-200 to-blue-200 text-blue-700 hover:from-slate-300 hover:to-blue-300",
    icon: "text-blue-600",
    label: "Silver Plus Number"
  },
  silver: {
    badge: "from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300",
    icon: "text-gray-600",
    label: "Silver Number"
  }
};

function PlanFeature({ 
  label, 
  value, 
  originalValue = "",
  icon: Icon,
  onLabelChange,
  onValueChange,
  onOriginalValueChange
}: { 
  label: string; 
  value: string; 
  originalValue?: string;
  icon: any;
  onLabelChange: (value: string) => void;
  onValueChange: (value: string) => void;
  onOriginalValueChange?: (value: string) => void;
}) {
  if (!value || !label) return null;
  
  return (
    <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-emerald-50 to-blue-50 p-2 transition-all hover:shadow-md h-[72px] backdrop-blur-sm">
      <div className="space-y-0.5">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Icon className="h-3.5 w-3.5 text-emerald-600" />
          <EditableText value={label} onChange={onLabelChange} className="text-xs font-medium" />
        </div>
        <div className="space-y-0">
          {originalValue && (
            <EditableText 
              value={originalValue} 
              onChange={onOriginalValueChange || (() => {})}
              className="text-[10px] line-through text-gray-400 -mb-0.5"
            />
          )}
          <EditableText 
            value={value}
            onChange={onValueChange}
            className="text-base font-bold bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent"
          />
        </div>
      </div>
    </div>
  );
}

export function PlanCard({ details, onUpdate, scales, hues }: PlanCardProps) {
  const typeStyles = numberTypeStyles[details.numberType];
  
  const scaleStyle = (scale: number) => ({
    transform: `scale(${scale})`,
    transformOrigin: 'center'
  });

  const hueStyle = (hue: number) => ({
    filter: `hue-rotate(${hue}deg)`
  });

  const updateDetail = (key: keyof PlanDetails) => (value: string) => {
    onUpdate({ ...details, [key]: value });
  };

  return (
    <div className="relative w-full max-w-[380px]">
      {/* Top left badge */}
      <div className="absolute -left-0 top-0 -translate-y-1/2 -rotate-90 origin-bottom-left z-10" style={scaleStyle(scales.header)}>
        <Badge variant="secondary" className={`bg-gradient-to-r ${typeStyles.badge} transition-all duration-300 shadow-sm text-xs px-3 py-1`}>
          <EditableText value={typeStyles.label} onChange={updateDetail('goldNumberLabel')} />
        </Badge>
      </div>

      <div className="absolute -inset-1.5 bg-gradient-to-r from-red-500/40 to-amber-500/40 opacity-75 blur-2xl -z-10 animate-pulse" style={hueStyle(hues.header)} />
      <div className="absolute -inset-1.5 bg-gradient-to-b from-blue-500/40 to-purple-500/40 opacity-75 blur-2xl -z-10" style={hueStyle(hues.header)} />
      
      <div className="relative rounded-xl p-[2px] bg-gradient-to-br from-red-500/80 via-amber-500/80 to-red-500/80" style={hueStyle(hues.header)}>
        <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/95 to-white/80 backdrop-blur-xl" />
        <Card className="relative border-0 shadow-[0_8px_16px_rgb(0_0_0/0.08),0_4px_8px_rgb(0_0_0/0.04)] hover:shadow-[0_12px_24px_rgb(0_0_0/0.12),0_8px_16px_rgb(0_0_0/0.08)] transition-all duration-500 backdrop-blur-sm bg-white/95">
          <CardHeader className="space-y-2 pb-2">
            {details.phoneNumber && (
              <div className="flex flex-row items-center justify-between gap-2 animate-fade-in">
                <div className="flex flex-col gap-1 flex-grow min-w-0">
                  <Badge variant="secondary" className={`bg-gradient-to-r ${typeStyles.badge} transition-all duration-300 shadow-sm mx-auto`}>
                    <EditableText 
                      value={details.phoneNumber}
                      onChange={updateDetail('phoneNumber')}
                      className="text-2xl font-bold font-display"
                    />
                  </Badge>
                </div>
                <div className="w-[80px] sm:w-[100px] h-16 sm:h-20 flex-shrink-0 flex items-center justify-center" style={scaleStyle(scales.logo)}>
                  <img 
                    src="https://backup.xadtechnologies.com/wp-content/uploads/2022/10/Eti-New-logo.png" 
                    alt="Etisalat Logo" 
                    className="w-full h-full object-contain"
                    style={{ imageRendering: 'high-quality' }}
                  />
                </div>
              </div>
            )}
            {details.planName && (
              <EditableText 
                value={details.planName}
                onChange={updateDetail('planName')}
                className="text-lg font-bold tracking-tight bg-gradient-to-br from-gray-900 via-gray-700 to-gray-800 bg-clip-text text-transparent"
              />
            )}
          </CardHeader>

          <CardContent className="space-y-3">
            <div className="grid gap-2" style={{ ...scaleStyle(scales.features), ...hueStyle(hues.features) }}>
              <div className="grid grid-cols-2 gap-2">
                <PlanFeature 
                  label={details.localDataLabel}
                  value={details.localData}
                  icon={Wifi}
                  onLabelChange={updateDetail('localDataLabel')}
                  onValueChange={updateDetail('localData')}
                />
                <PlanFeature 
                  label={details.speedLabel}
                  value={details.speed}
                  originalValue={details.speedOriginal}
                  icon={Globe2}
                  onLabelChange={updateDetail('speedLabel')}
                  onValueChange={updateDetail('speed')}
                  onOriginalValueChange={updateDetail('speedOriginal')}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <PlanFeature 
                  label={details.flexiMinutesLabel}
                  value={details.flexiMinutes}
                  originalValue={details.flexiMinutesOriginal}
                  icon={PhoneCall}
                  onLabelChange={updateDetail('flexiMinutesLabel')}
                  onValueChange={updateDetail('flexiMinutes')}
                  onOriginalValueChange={updateDetail('flexiMinutesOriginal')}
                />
                <PlanFeature 
                  label={details.roamingDataLabel}
                  value={details.roamingData}
                  icon={Globe}
                  onLabelChange={updateDetail('roamingDataLabel')}
                  onValueChange={updateDetail('roamingData')}
                />
              </div>
            </div>

            {(details.promotionTitle || details.promotionOffer1 || details.promotionOffer2) && (
              <div className="rounded-lg bg-gradient-to-br from-red-500 via-red-600 to-red-700 p-3 text-white space-y-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5" style={{ ...scaleStyle(scales.promo), ...hueStyle(hues.promo) }}>
                {details.promotionTitle && (
                  <p className="text-sm font-bold flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4" />
                    <EditableText value={details.promotionTitle} onChange={updateDetail('promotionTitle')} />
                  </p>
                )}
                <div className="space-y-1.5">
                  {details.promotionOffer1 && (
                    <p className="text-xs flex items-center gap-1.5 bg-white/10 p-1.5 rounded-md backdrop-blur-sm">
                      <Gift className="h-3.5 w-3.5" />
                      <EditableText value={details.promotionOffer1} onChange={updateDetail('promotionOffer1')} />
                    </p>
                  )}
                  {details.promotionOffer2 && (
                    <p className="text-xs flex items-center gap-1.5 bg-white/10 p-1.5 rounded-md backdrop-blur-sm">
                      <Gift className="h-3.5 w-3.5" />
                      <EditableText value={details.promotionOffer2} onChange={updateDetail('promotionOffer2')} />
                    </p>
                  )}
                </div>
              </div>
            )}

            {(details.price || details.commitmentText || details.vatText) && (
              <div className="space-y-1 p-2 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100" style={{ ...scaleStyle(scales.footer), ...hueStyle(hues.footer) }}>
                {details.commitmentText && (
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-gray-600" />
                    <EditableText 
                      value={details.commitmentText}
                      onChange={updateDetail('commitmentText')}
                      className="text-xs font-medium text-gray-600"
                    />
                  </div>
                )}
                {details.price && (
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-bold text-gray-900">
                      AED <EditableText 
                        value={details.price}
                        onChange={updateDetail('price')}
                        className="inline text-gray-900"
                      />
                    </span>
                    <span className="text-sm text-gray-600">/month</span>
                  </div>
                )}
                {details.vatText && (
                  <EditableText 
                    value={details.vatText}
                    onChange={updateDetail('vatText')}
                    className="text-[10px] text-gray-500"
                  />
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}