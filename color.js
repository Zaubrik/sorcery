/**
 * https://github.com/hamada147/IsThisColourSimilar/blob/master/Colour.js
 * Color class
 * Represent the color object and its different types (HEX, RGBA, XYZ, LAB)
 * This class has the ability to do the following
 * 1. Convert HEX to RGBA
 * 2. Convert RGB to XYZ
 * 3. Convert XYZ to LAB
 * 4. Calculate Delta E00 between two LAB colors (Main purpose)
 * 5. Generate CSS filters
 */

export class Color {
  constructor(r, g, b) {
    this.set(r, g, b);
  }

  toString() {
    return `rgb(${Math.round(this.r)}, ${Math.round(this.g)}, ${
      Math.round(this.b)
    })`;
  }

  set(r, g, b) {
    this.r = this.clamp(r);
    this.g = this.clamp(g);
    this.b = this.clamp(b);
  }

  hueRotate(angle = 0) {
    angle = (angle / 180) * Math.PI;
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);

    this.multiply([
      0.213 + cos * 0.787 - sin * 0.213,
      0.715 - cos * 0.715 - sin * 0.715,
      0.072 - cos * 0.072 + sin * 0.928,
      0.213 - cos * 0.213 + sin * 0.143,
      0.715 + cos * 0.285 + sin * 0.140,
      0.072 - cos * 0.072 - sin * 0.283,
      0.213 - cos * 0.213 - sin * 0.787,
      0.715 - cos * 0.715 + sin * 0.715,
      0.072 + cos * 0.928 + sin * 0.072,
    ]);
  }

  grayscale(value = 1) {
    this.multiply([
      0.2126 + 0.7874 * (1 - value),
      0.7152 - 0.7152 * (1 - value),
      0.0722 - 0.0722 * (1 - value),
      0.2126 - 0.2126 * (1 - value),
      0.7152 + 0.2848 * (1 - value),
      0.0722 - 0.0722 * (1 - value),
      0.2126 - 0.2126 * (1 - value),
      0.7152 - 0.7152 * (1 - value),
      0.0722 + 0.9278 * (1 - value),
    ]);
  }

  sepia(value = 1) {
    this.multiply([
      0.393 + 0.607 * (1 - value),
      0.769 - 0.769 * (1 - value),
      0.189 - 0.189 * (1 - value),
      0.349 - 0.349 * (1 - value),
      0.686 + 0.314 * (1 - value),
      0.168 - 0.168 * (1 - value),
      0.272 - 0.272 * (1 - value),
      0.534 - 0.534 * (1 - value),
      0.131 + 0.869 * (1 - value),
    ]);
  }

  saturate(value = 1) {
    this.multiply([
      0.213 + 0.787 * value,
      0.715 - 0.715 * value,
      0.072 - 0.072 * value,
      0.213 - 0.213 * value,
      0.715 + 0.285 * value,
      0.072 - 0.072 * value,
      0.213 - 0.213 * value,
      0.715 - 0.715 * value,
      0.072 + 0.928 * value,
    ]);
  }

  multiply(matrix) {
    const newR = this.clamp(
      this.r * matrix[0] + this.g * matrix[1] + this.b * matrix[2],
    );
    const newG = this.clamp(
      this.r * matrix[3] + this.g * matrix[4] + this.b * matrix[5],
    );
    const newB = this.clamp(
      this.r * matrix[6] + this.g * matrix[7] + this.b * matrix[8],
    );
    this.r = newR;
    this.g = newG;
    this.b = newB;
  }

  brightness(value = 1) {
    this.linear(value);
  }

  contrast(value = 1) {
    this.linear(value, -(0.5 * value) + 0.5);
  }

  linear(slope = 1, intercept = 0) {
    this.r = this.clamp(this.r * slope + intercept * 255);
    this.g = this.clamp(this.g * slope + intercept * 255);
    this.b = this.clamp(this.b * slope + intercept * 255);
  }

  invert(value = 1) {
    this.r = this.clamp((value + (this.r / 255) * (1 - 2 * value)) * 255);
    this.g = this.clamp((value + (this.g / 255) * (1 - 2 * value)) * 255);
    this.b = this.clamp((value + (this.b / 255) * (1 - 2 * value)) * 255);
  }

  hsl() {
    const r = this.r / 255;
    const g = this.g / 255;
    const b = this.b / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return {
      h: h * 100,
      s: s * 100,
      l: l * 100,
    };
  }

  clamp(value) {
    return Math.max(0, Math.min(255, value));
  }

  /**
   * Convert HEX to LAB
   * @param {string} hex Hex color value desired to be converted to LAB
   * @returns {[number, number, number]} LAB color values
   */
  static hex2lab(hex) {
    const [r, g, b, a] = Color.hex2rgba(hex);
    const [x, y, z] = Color.rgb2xyz(r, g, b, a);
    return Color.xyz2lab(x, y, z);
  }

  /**
   * Convert RGBA to LAB
   * @param {number} r Red value from 0 to 255
   * @param {number} g Green value from 0 to 255
   * @param {number} b Blue value from 0 to 255
   * @param {number} [a=1] Alpha value from 0 to 1
   * @returns {[number, number, number]} LAB color values
   */
  static rgba2lab(r, g, b, a = 1) {
    if ([r, g, b].every((n) => typeof n === "number" && n >= 0 && n <= 255)) {
      const [x, y, z] = Color.rgb2xyz(r, g, b, a);
      return Color.xyz2lab(x, y, z);
    } else {
      throw Error(`Invalid color format: '${[r, g, b]}'.`);
    }
  }

  /**
   * Convert LAB to RGBA
   * @param {number} l Lightness value
   * @param {number} a A value
   * @param {number} b B value
   * @returns {[number, number, number, number]} RGBA color values
   */
  static lab2rgba(l, a, b) {
    const [x, y, z] = Color.lab2xyz(l, a, b);
    return Color.xyz2rgba(x, y, z);
  }

  /**
   * Convert HEX to RGBA
   * @param {string} hex Hex color value desired to be converted to RGBA
   * @returns {[number, number, number, number]} RGBA color values
   */
  static hex2rgba(hex) {
    let c;
    if (hex.charAt(0) === "#") {
      c = hex.substring(1).split("");
    }
    if (c.length > 6 || c.length < 3) {
      throw new Error(
        `HEX color must be 3 or 6 values. You provided it ${c.length}`,
      );
    }
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");
    let r = (c >> 16) & 255;
    let g = (c >> 8) & 255;
    let b = c & 255;
    let a = 1;
    return [r, g, b, a];
  }

  /**
   * Convert RGB to XYZ
   * @param {number} r Red value from 0 to 255
   * @param {number} g Green value from 0 to 255
   * @param {number} b Blue value from 0 to 255
   * @param {number} [a=1] Alpha value from 0 to 1 with a default value of 1 if not sent
   * @returns {[number, number, number]} XYZ color values
   */
  static rgb2xyz(r, g, b, a = 1) {
    if (r > 255) r = 255;
    else if (r < 0) r = 0;
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
    if (b > 255) b = 255;
    else if (b < 0) b = 0;
    if (a > 1) a = 1;
    else if (a < 0) a = 0;

    r /= 255;
    g /= 255;
    b /= 255;

    if (r > 0.04045) r = Math.pow((r + 0.055) / 1.055, 2.4);
    else r /= 12.92;
    if (g > 0.04045) g = Math.pow((g + 0.055) / 1.055, 2.4);
    else g /= 12.92;
    if (b > 0.04045) b = Math.pow((b + 0.055) / 1.055, 2.4);
    else b /= 12.92;

    r *= 100;
    g *= 100;
    b *= 100;

    const x = r * 0.4124564 + g * 0.3575761 + b * 0.1804375;
    const y = r * 0.2126729 + g * 0.7151522 + b * 0.0721750;
    const z = r * 0.0193339 + g * 0.1191920 + b * 0.9503041;

    return [x, y, z];
  }

  /**
   * Convert XYZ to RGBA
   * @param {number} x X value
   * @param {number} y Y value
   * @param {number} z Z value
   * @returns {[number, number, number, number]} RGBA color values
   */
  static xyz2rgba(x, y, z) {
    let varX = x / 100;
    let varY = y / 100;
    let varZ = z / 100;

    let varR = varX * 3.2404542 + varY * -1.5371385 + varZ * -0.4985314;
    let varG = varX * -0.9692660 + varY * 1.8760108 + varZ * 0.0415560;
    let varB = varX * 0.0556434 + varY * -0.2040259 + varZ * 1.0572252;

    if (varR > 0.0031308) varR = 1.055 * Math.pow(varR, 1 / 2.4) - 0.055;
    else varR = 12.92 * varR;
    if (varG > 0.0031308) varG = 1.055 * Math.pow(varG, 1 / 2.4) - 0.055;
    else varG = 12.92 * varG;
    if (varB > 0.0031308) varB = 1.055 * Math.pow(varB, 1 / 2.4) - 0.055;
    else varB = 12.92 * varB;

    let r = Math.round(varR * 255);
    let g = Math.round(varG * 255);
    let b = Math.round(varB * 255);

    return [r, g, b, 1];
  }

  /**
   * Convert XYZ to LAB
   * @param {number} x X value
   * @param {number} y Y value
   * @param {number} z Z value
   * @returns {[number, number, number]} LAB color values
   */
  static xyz2lab(x, y, z) {
    const referenceX = 94.811;
    const referenceY = 100;
    const referenceZ = 107.304;

    x = x / referenceX;
    y = y / referenceY;
    z = z / referenceZ;

    if (x > 0.008856) x = Math.pow(x, 1 / 3);
    else x = (7.787 * x) + (16 / 116);
    if (y > 0.008856) y = Math.pow(y, 1 / 3);
    else y = (7.787 * y) + (16 / 116);
    if (z > 0.008856) z = Math.pow(z, 1 / 3);
    else z = (7.787 * z) + (16 / 116);

    const l = (116 * y) - 16;
    const a = 500 * (x - y);
    const b = 200 * (y - z);

    return [l, a, b];
  }

  /**
   * Convert LAB to XYZ
   * @param {number} l Lightness value
   * @param {number} a A value
   * @param {number} b B value
   * @returns {[number, number, number]} XYZ color values
   */
  static lab2xyz(l, a, b) {
    const referenceX = 94.811;
    const referenceY = 100;
    const referenceZ = 107.304;

    let varY = (l + 16) / 116;
    let varX = a / 500 + varY;
    let varZ = varY - b / 200;

    if (Math.pow(varY, 3) > 0.008856) varY = Math.pow(varY, 3);
    else varY = (varY - 16 / 116) / 7.787;
    if (Math.pow(varX, 3) > 0.008856) varX = Math.pow(varX, 3);
    else varX = (varX - 16 / 116) / 7.787;
    if (Math.pow(varZ, 3) > 0.008856) varZ = Math.pow(varZ, 3);
    else varZ = (varZ - 16 / 116) / 7.787;

    let x = varX * referenceX;
    let y = varY * referenceY;
    let z = varZ * referenceZ;

    return [x, y, z];
  }

  /**
   * The difference between two given colors with respect to the human eye
   * @param {number} l1 Color 1 Lightness
   * @param {number} a1 Color 1 A value
   * @param {number} b1 Color 1 B value
   * @param {number} l2 Color 2 Lightness
   * @param {number} a2 Color 2 A value
   * @param {number} b2 Color 2 B value
   * @returns {number} Delta E00 value
   */
  static deltaE00(l1, a1, b1, l2, a2, b2) {
    Math.rad2deg = function (rad) {
      return (360 * rad) / (2 * Math.PI);
    };
    Math.deg2rad = function (deg) {
      return (2 * Math.PI * deg) / 360;
    };

    const avgL = (l1 + l2) / 2;
    const c1 = Math.sqrt(Math.pow(a1, 2) + Math.pow(b1, 2));
    const c2 = Math.sqrt(Math.pow(a2, 2) + Math.pow(b2, 2));
    const avgC = (c1 + c2) / 2;
    const g = (1 -
      Math.sqrt(Math.pow(avgC, 7) / (Math.pow(avgC, 7) + Math.pow(25, 7)))) /
      2;

    const a1p = a1 * (1 + g);
    const a2p = a2 * (1 + g);

    const c1p = Math.sqrt(Math.pow(a1p, 2) + Math.pow(b1, 2));
    const c2p = Math.sqrt(Math.pow(a2p, 2) + Math.pow(b2, 2));

    const avgCp = (c1p + c2p) / 2;

    let h1p = Math.rad2deg(Math.atan2(b1, a1p));
    if (h1p < 0) h1p += 360;
    let h2p = Math.rad2deg(Math.atan2(b2, a2p));
    if (h2p < 0) h2p += 360;

    const avghp = Math.abs(h1p - h2p) > 180
      ? (h1p + h2p + 360) / 2
      : (h1p + h2p) / 2;

    const t = 1 -
      0.17 * Math.cos(Math.deg2rad(avghp - 30)) +
      0.24 * Math.cos(Math.deg2rad(2 * avghp)) +
      0.32 * Math.cos(Math.deg2rad(3 * avghp + 6)) -
      0.2 * Math.cos(Math.deg2rad(4 * avghp - 63));

    let deltahp = h2p - h1p;
    if (Math.abs(deltahp) > 180) {
      if (h2p <= h1p) deltahp += 360;
      else deltahp -= 360;
    }

    const deltalp = l2 - l1;
    const deltacp = c2p - c1p;

    deltahp = 2 * Math.sqrt(c1p * c2p) * Math.sin(Math.deg2rad(deltahp) / 2);

    const sl = 1 +
      (0.015 * Math.pow(avgL - 50, 2)) / Math.sqrt(20 + Math.pow(avgL - 50, 2));
    const sc = 1 + 0.045 * avgCp;
    const sh = 1 + 0.015 * avgCp * t;

    const deltaro = 30 * Math.exp(-Math.pow((avghp - 275) / 25, 2));
    const rc = 2 *
      Math.sqrt(Math.pow(avgCp, 7) / (Math.pow(avgCp, 7) + Math.pow(25, 7)));
    const rt = -rc * Math.sin(2 * Math.deg2rad(deltaro));

    const kl = 1;
    const kc = 1;
    const kh = 1;

    const deltaE = Math.sqrt(
      Math.pow(deltalp / (kl * sl), 2) +
        Math.pow(deltacp / (kc * sc), 2) +
        Math.pow(deltahp / (kh * sh), 2) +
        rt * (deltacp / (kc * sc)) * (deltahp / (kh * sh)),
    );

    return deltaE;
  }

  /**
   * Get darker color of the given color
   * @param {number} r Red value from 0 to 255
   * @param {number} g Green value from 0 to 255
   * @param {number} b Blue value from 0 to 255
   * @param {number} [a=1] Alpha value from 0 to 1
   * @param {number} [darkenPercentage=0.05] Percentage to darken the color
   * @returns {[number, number, number, number]} RGBA color values
   */
  static getDarkerColor(r, g, b, a = 1, darkenPercentage = 0.05) {
    let [l1, a1, b1] = Color.rgba2lab(r, g, b, a);
    l1 -= l1 * darkenPercentage;
    if (l1 < 0) l1 = 0;
    return Color.lab2rgba(l1, a1, b1);
  }

  /**
   * Get brighter color of the given color
   * @param {number} r Red value from 0 to 255
   * @param {number} g Green value from 0 to 255
   * @param {number} b Blue value from 0 to 255
   * @param {number} [a=1] Alpha value from 0 to 1
   * @param {number} [brighterPercentage=0.05] Percentage to brighten the color
   * @returns {[number, number, number, number]} RGBA color values
   */
  static getBrighterColor(r, g, b, a = 1, brighterPercentage = 0.05) {
    let [l1, a1, b1] = Color.rgba2lab(r, g, b, a);
    l1 += l1 * brighterPercentage;
    if (l1 > 100) l1 = 100;
    return Color.lab2rgba(l1, a1, b1);
  }

  /**
   * Generate CSS filter
   * @param {[number, number, number]|string} colorInput RGB array or hex string
   * @returns {string} CSS filter string
   * ```js
   * const filter = Color.generateCssFilter([43, 129, 198]);
   * const filter2 = Color.generateCssFilter("#2b81c6");
   *  ```
   */
  static generateCssFilter(colorInput) {
    let counter = 0;
    let rgb;

    if (Array.isArray(colorInput)) {
      if (
        colorInput.length === 3 &&
        colorInput.every((n) => typeof n === "number" && n >= 0 && n <= 255)
      ) {
        rgb = colorInput;
      } else {
        throw Error(`Invalid RGB color format: '${colorInput}'.`);
      }
    } else if (typeof colorInput === "string" && colorInput.startsWith("#")) {
      rgb = Color.hex2rgba(colorInput).slice(0, 3);
    } else {
      throw Error(`Invalid color format: '${colorInput}'.`);
    }

    return Color.getResult(rgb, counter).filter;
  }

  /**
   * Helper function to get the CSS filter result
   * @param {[number, number, number]} rgb RGB color values
   * @param {number} counter Counter for recursive calls
   * @returns {object} CSS filter result
   */
  static getResult(rgb, counter) {
    const color = new Color(rgb[0], rgb[1], rgb[2]);
    const solver = new Color.Solver(color);
    const result = solver.solve();
    return counter < 300
      ? result.loss < 1 ? result : Color.getResult(rgb, ++counter)
      : counter < 700
      ? result.loss < 5 ? result : Color.getResult(rgb, ++counter)
      : counter < 800
      ? result.loss < 20 ? result : Color.getResult(rgb, ++counter)
      : result;
  }

  /**
   * Solver class for finding CSS filters
   */
  static Solver = class {
    constructor(target) {
      this.target = target;
      this.targetHSL = target.hsl();
      this.reusedColor = new Color(0, 0, 0);
    }

    solve() {
      const result = this.solveNarrow(this.solveWide());
      return {
        values: result.values,
        loss: result.loss,
        filter: this.css(result.values),
      };
    }

    solveWide() {
      const A = 5;
      const c = 15;
      const a = [60, 180, 18000, 600, 1.2, 1.2];

      let best = { loss: Infinity };
      for (let i = 0; best.loss > 25 && i < 3; i++) {
        const initial = [50, 20, 3750, 50, 100, 100];
        const result = this.spsa(A, a, c, initial, 1000);
        if (result.loss < best.loss) {
          best = result;
        }
      }
      return best;
    }

    solveNarrow(wide) {
      const A = wide.loss;
      const c = 2;
      const A1 = A + 1;
      const a = [0.25 * A1, 0.25 * A1, A1, 0.25 * A1, 0.2 * A1, 0.2 * A1];
      return this.spsa(A, a, c, wide.values, 500);
    }

    spsa(A, a, c, values, iters) {
      const alpha = 1;
      const gamma = 0.16666666666666666;

      let best = null;
      let bestLoss = Infinity;
      const deltas = new Array(6);
      const highArgs = new Array(6);
      const lowArgs = new Array(6);

      for (let k = 0; k < iters; k++) {
        const ck = c / Math.pow(k + 1, gamma);
        for (let i = 0; i < 6; i++) {
          deltas[i] = Math.random() > 0.5 ? 1 : -1;
          highArgs[i] = values[i] + ck * deltas[i];
          lowArgs[i] = values[i] - ck * deltas[i];
        }

        const lossDiff = this.loss(highArgs) - this.loss(lowArgs);
        for (let i = 0; i < 6; i++) {
          const g = (lossDiff / (2 * ck)) * deltas[i];
          const ak = a[i] / Math.pow(A + k + 1, alpha);
          values[i] = fix(values[i] - ak * g, i);
        }

        const loss = this.loss(values);
        if (loss < bestLoss) {
          best = values.slice(0);
          bestLoss = loss;
        }
      }
      return { values: best, loss: bestLoss };

      function fix(value, idx) {
        let max = 100;
        if (idx === 2 /* saturate */) max = 7500;
        else if (idx === 4 /* brightness */ || idx === 5 /* contrast */) {
          max = 200;
        }

        if (idx === 3 /* hue-rotate */) {
          if (value > max) value %= max;
          else if (value < 0) value = max + (value % max);
        } else if (value < 0) value = 0;
        else if (value > max) value = max;

        return value;
      }
    }

    loss(filters) {
      const color = this.reusedColor;
      color.set(0, 0, 0);

      color.invert(filters[0] / 100);
      color.sepia(filters[1] / 100);
      color.saturate(filters[2] / 100);
      color.hueRotate(filters[3] * 3.6);
      color.brightness(filters[4] / 100);
      color.contrast(filters[5] / 100);

      const colorHSL = color.hsl();
      return (
        Math.abs(color.r - this.target.r) +
        Math.abs(color.g - this.target.g) +
        Math.abs(color.b - this.target.b) +
        Math.abs(colorHSL.h - this.targetHSL.h) +
        Math.abs(colorHSL.s - this.targetHSL.s) +
        Math.abs(colorHSL.l - this.targetHSL.l)
      );
    }

    css(filters) {
      function fmt(idx, multiplier = 1) {
        return Math.round(filters[idx] * multiplier);
      }
      return `invert(${fmt(0)}%) sepia(${fmt(1)}%) saturate(${
        fmt(2)
      }%) hue-rotate(${fmt(3, 3.6)}deg) brightness(${fmt(4)}%) contrast(${
        fmt(5)
      }%)`;
    }
  };
}
