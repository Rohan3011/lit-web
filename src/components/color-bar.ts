import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Color, Theme } from "../types/color-bar";

@customElement("color-bar")
export class ColorBar extends LitElement {
  constructor() {
    super();
  }

  @property()
  color?: Color;

  @property()
  theme: Theme = "light";

  connectedCallback() {
    super.connectedCallback();
    this.handleClick();
  }

  private handleClick() {
    if (this.theme == "dark") {
      this.generateDarkHslColor();
    } else {
      this.generateLightHslColor();
    }
  }

  render() {
    return html`
      <section>
        <h3>${this.theme.toLocaleUpperCase()}</h3>
        <div
          class="color-block"
          style="--background: ${this.hslColor()}; --foreground: ${this
            .theme === "light"
            ? "#000"
            : "#fff"}"
        ></div>
        <div class="color-list">
          <p>${this.hslColor()}</p>
          <p>${this.hexColor()}</p>
          <p>${this.rgbColor()}</p>
        </div>

        <button
          style="--background: ${this.hslColor()}; --foreground: ${this
            .theme === "light"
            ? "#000"
            : "#fff"}"
          type="button"
          @click=${this.handleClick}
        >
          Click me
        </button>
      </section>
    `;
  }

  private generateLightHslColor() {
    const randomHue = this.getRandomNumber(1, 360);
    const randomSaturation = this.getRandomNumber(50, 101);
    const randomLightness = this.getRandomNumber(50, 101);
    this.color = { h: randomHue, s: randomSaturation, l: randomLightness };
    console.log(this.hslColor());
  }

  private generateDarkHslColor() {
    const randomHue = this.getRandomNumber(1, 360);
    const randomSaturation = this.getRandomNumber(1, 50);
    const randomLightness = this.getRandomNumber(1, 50);
    this.color = { h: randomHue, s: randomSaturation, l: randomLightness };
    console.log(this.hslColor());
  }

  private getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private hslColor(): string {
    if (typeof this.color === "undefined") return "";

    if ("h" in this.color) {
      const { h, s, l } = this.color;
      return `hsl(${h}, ${s}%, ${l}%)`;
    }

    return "";
  }

  private hexColor(): string {
    if (!this.color) return "";
    let { h, s, l } = this.color;
    h = (h + 360) % 360; // Ensure h is within 0-359 range
    s = Math.max(0, Math.min(s, 100)) / 100; // Ensure s is within 0-1 range
    l = Math.max(0, Math.min(l, 100)) / 100; // Ensure l is within 0-1 range

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;

    let r = 0,
      g = 0,
      b = 0;

    if (h >= 0 && h < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (h >= 60 && h < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (h >= 120 && h < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (h >= 180 && h < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (h >= 240 && h < 300) {
      r = x;
      g = 0;
      b = c;
    } else if (h >= 300 && h < 360) {
      r = c;
      g = 0;
      b = x;
    }

    const toHex = (value: number): string => {
      const hex = Math.round(value * 255).toString(16);
      return hex.length === 1 ? `0${hex}` : hex;
    };

    const hexCode = `#${toHex(r + m)}${toHex(g + m)}${toHex(b + m)}`;
    return hexCode;
  }

  private rgbColor(): string {
    if (!this.color) return "";
    let { h, s, l } = this.color;

    h = (h + 360) % 360; // Ensure h is within 0-359 range
    s = Math.max(0, Math.min(s, 100)) / 100; // Ensure s is within 0-1 range
    l = Math.max(0, Math.min(l, 100)) / 100; // Ensure l is within 0-1 range

    if (s === 0) {
      const value = Math.round(l * 255);
      return `rgb(${value} , ${value}, ${value})`;
    } else {
      const hueToRgb = (p: number, q: number, t: number): number => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;

      const r = Math.round(hueToRgb(p, q, h / 360 + 1 / 3) * 255);
      const g = Math.round(hueToRgb(p, q, h / 360) * 255);
      const b = Math.round(hueToRgb(p, q, h / 360 - 1 / 3) * 255);

      return `rgb(${r} , ${g}, ${b})`;
    }
  }

  static styles = css`
    section {
      width: 300px;
      margin: 1px;
      padding: 40px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .color-block {
      height: 100px;
      width: 100px;
      border: 2px solid white;
      background-color: var(--background);
    }

    .color-list {
      width: 100%;
      display: inline-block;
    }

    .color-list > p {
      padding: 8px 12px;
      border: 2px solid darkgray;
      border-radius: 4px;
      cursor: pointer;
    }

    .color-list > p:hover {
      background-color: hsl(256, 4%, 4%);
    }

    button {
      padding: 14px 28px;
      border: 2px solid slategray;
      border-radius: 4px;
      background-color: var(--background);
      color: var(--foreground);
      cursor: pointer;
      box-shadow: 1px 1px 2px hsl(0, 8%, 8%);
      font-size: medium;
    }

    button:hover {
      opacity: 0.8;
    }
  `;
}
