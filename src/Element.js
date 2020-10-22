import React, { useState } from 'react';

import './element.css';
import table from './table';
import colors from './colors';

const Element = (props) => {
  const { symbol } = props;
  const tableData = table['PERIODIC_TABLE']['ATOM'];
  const [data, setData] = useState({});

  function luminanace(r, g, b) {
    const a = [r, g, b].map(function (v) {
        v /= 255;
        return v <= 0.03928
            ? v / 12.92
            : Math.pow( (v + 0.055) / 1.055, 2.4 );
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  }

  function contrast(rgb1, rgb2) {
    const lum1 = luminanace(rgb1[0], rgb1[1], rgb1[2]);
    const lum2 = luminanace(rgb2[0], rgb2[1], rgb2[2]);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
  }

  function hexToRgb(hex) {
    let c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split('');
      if (c.length === 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = `0x${c.join('')}`;
      return [(c>>16)&255, (c>>8)&255, c&255];
    }
  }

  function setColors() {
    const choice = Math.floor(Math.random() * (colors.length));
    const wrapper = document.getElementById('wrapper');
    const textColor =
      contrast([255, 255, 255], hexToRgb(colors[choice])) > contrast([0, 0, 0], hexToRgb(colors[choice]))
      ? '#FFF'
      : '#000';
    
    wrapper.style.background = colors[choice];
    wrapper.style.color = textColor;
  }

  React.useEffect(() => {
    tableData.some(element => {
      if (element['SYMBOL'] === symbol) {
        setData(element);
        return true;
      }
      return false;
    });
    setColors();
  });

  return (
    <div className="element-wrapper" id="wrapper">
      <div className="element-number">{data['ATOMIC_NUMBER']}</div>
      <div className="element-symbol">{data['SYMBOL']}</div>
      <div className="element-name">{data['NAME']}</div>
      <div className="element-weight">{parseFloat(data['ATOMIC_WEIGHT']).toFixed(3)}</div>
    </div>
  );
}

export default Element;
