import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("landing-page")
export class LandingPage extends LitElement {
  render() {
    return html`
      <div>
        <header class="header">
          <h1>Welcome to LitJS Landing Page</h1>
        </header>
        <div class="container">
          <p>
            This is a demo landing page built using LitJS and the lit-html
            library.
          </p>
          <p>
            LitJS is a powerful JavaScript library for creating web components
            using template literals and reactive rendering.
          </p>
          <a class="btn" href="#">Get Started</a>
        </div>
      </div>
    `;
  }

  static styles = css`
    .header {
      background-color: #333;
      color: #fff;
      padding: 20px;
      text-align: center;
    }

    .container {
      /* max-width: 960px; */
      margin: 0 auto;
      padding: 20px;
    }

    h1 {
      font-size: 36px;
      margin-bottom: 20px;
    }

    p {
      font-size: 18px;
      line-height: 1.5;
      margin-bottom: 10px;
    }

    .btn {
      display: inline-block;
      padding: 10px 20px;
      background-color: #333;
      color: #fff;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
      transition: background-color 0.3s ease;
    }

    .btn:hover {
      background-color: #666;
    }
  `;
}
