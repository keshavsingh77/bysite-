
import React, { useEffect } from 'react';
import { ADSENSE_CLIENT, ADSENSE_SLOT } from '../constants';

interface AdUnitProps {
  className?: string;
  style?: React.CSSProperties;
}

const AdUnit: React.FC<AdUnitProps> = ({ className = '', style }) => {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense push error', e);
    }
  }, []);

  return (
    <div className={`ad-container overflow-hidden my-6 ${className}`}>
      <ins
        className="adsbygoogle"
        style={style || { display: 'block' }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={ADSENSE_SLOT}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AdUnit;
