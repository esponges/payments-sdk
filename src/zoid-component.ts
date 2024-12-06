import { create } from 'zoid/dist/zoid.frameworks';

/* 
  This would be the SDK bridge external dependency
  This is the shared component that will be used to render the payment form.
  Should be imported by the parent and the child.
*/

const loadingSpinnerCSS = `
  html {
      box-sizing: border-box
  }
  
  *,:after,:before {
      box-sizing: inherit
  }
  
  body {
      font-family: "Open Sans",sans-serif;
      font-size: 16px;
      font-weight: 400;
      font-style: normal;
      line-height: 24px;
      color: #666;
      -webkit-font-smoothing: antialiased!important;
      -moz-osx-font-smoothing: grayscale!important;
      -ms-font-smoothing: antialiased!important
  }
  
  body {
      background-color: #fff;
      height: 100%;
      margin: 0;
      padding: 0;
      font-family: "Open Sans", sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
  }
  
  body,html {
      height: 100%
  }
  
  @keyframes L_circle_rotate {
      0% {
          -webkit-transform: rotate(0);
          transform: rotate(0)
      }
  
      100% {
          -webkit-transform: rotate(359deg);
          transform: rotate(360deg)
      }
  }
  
  @keyframes L_stroke_rotate {
      0% {
          -webkit-transform: rotate(0);
          transform: rotate(0)
      }
  
      100% {
          -webkit-transform: rotate(1079deg);
          transform: rotate(1079deg)
      }
  }
  
  @keyframes L_stroke_fix {
      0% {
          -webkit-transform: rotate(0);
          transform: rotate(0)
      }
  
      50% {
          -webkit-transform: rotate(135deg);
          transform: rotate(135deg)
      }
  
      100% {
          -webkit-transform: rotate(270deg);
          transform: rotate(270deg)
      }
  }
  
  @keyframes L_stroke_left_grow {
      0% {
          -webkit-transform: rotate(-5deg);
          transform: rotate(-5deg)
      }
  
      50% {
          -webkit-transform: rotate(-140deg);
          transform: rotate(-140deg)
      }
  
      100% {
          -webkit-transform: rotate(-5deg);
          transform: rotate(-5deg)
      }
  }
  
  @keyframes L_stroke_right_grow {
      0% {
          -webkit-transform: rotate(5deg);
          transform: rotate(5deg)
      }
  
      50% {
          -webkit-transform: rotate(140deg);
          transform: rotate(140deg)
      }
  
      100% {
          -webkit-transform: rotate(5deg);
          transform: rotate(5deg)
      }
  }
  
  .progress-circular .stroke-left::before,.progress-circular .stroke-right::before,.progress-circular .stroke::before {
      content: "";
      display: block
  }
  
  .progress-circular,.progress-circular .stroke,.progress-circular .stroke-left,.progress-circular .stroke-left::before,.progress-circular .stroke-right,.progress-circular .stroke-right::before,.progress-circular .stroke::before {
      width: 2em;
      height: 2em;
      box-sizing: border-box;
      border-radius: 50%;
      color: #f96302
  }
  
  .progress-circular .stroke,.progress-circular .stroke::before {
      color: transparent
  }
  
  .progress-circular .stroke-left::before,.progress-circular .stroke-right::before,.progress-circular .stroke::before {
      border-style: solid;
      border-width: .21429em;
      border-color: currentColor
  }
  
  .progress-circular .stroke-left::before,.progress-circular .stroke-right {
      position: absolute;
      clip: rect(0 2em 2em 1em)
  }
  
  .progress-circular .stroke-left,.progress-circular .stroke-right::before {
      position: absolute;
      clip: rect(0 1em 2em 0)
  }
  
  .progress-circular .stroke::before {
      position: absolute;
      clip: rect(0 1.05em 1em .95em)
  }
  
  .progress-circular.indeterminate {
      animation: L_circle_rotate 1.568s linear infinite both
  }
  
  .progress-circular.indeterminate .stroke-left,.progress-circular.indeterminate .stroke-right,.progress-circular.indeterminate .stroke::before {
      animation: L_stroke_fix 1333ms cubic-bezier(.4,0,.2,1) infinite both
  }
  
  .progress-circular.indeterminate .stroke {
      animation: L_stroke_rotate 5332ms steps(4) infinite both
  }
  
  .progress-circular.indeterminate .stroke-right::before {
      animation: L_stroke_right_grow 1333ms cubic-bezier(.4,0,.2,1) infinite both
  }
  
  .progress-circular.indeterminate .stroke-left::before {
      animation: L_stroke_left_grow 1333ms cubic-bezier(.4,0,.2,1) infinite both
  }
  
  .progress-circular.md {
      font-size: 30px
  }
  
  .progress-circular.lg {
      font-size: 42px
  }
  
  .loading-screen {
      overflow: hidden;
      height: 100vh;
      width: 100%;
      padding: 1em;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -ms-flex-direction: column;
      align-items: center;
      flex-direction: column;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      background-color: white;
  }
  
  .loading-screen * {
      margin-bottom: 0.5em;
  }
  
  .loading-screen *:last-child {
      margin-bottom: 0;
  }
`

export const createLoadingSpinner = (doc: Document) => {
    const html = doc.createElement("html");
    const body = doc.createElement("body");
    const style = doc.createElement("style");
    const loadingWheelContainer = doc.createElement("div");
    const loaderWheel = doc.createElement("div");
    const stroke = doc.createElement("div");
    const strokeLeft = doc.createElement("div");
    const strokeRight = doc.createElement("div");
    loadingWheelContainer.classList.add("loading-screen");
    loaderWheel.classList.add("progress-circular", "indeterminate", "lg");
    stroke.classList.add("stroke");
    strokeLeft.classList.add("stroke-left");
    strokeRight.classList.add("stroke-right");

    html.appendChild(style);
    style.appendChild(
        doc.createTextNode(loadingSpinnerCSS)
    );
    html.appendChild(body);
    body.appendChild(loadingWheelContainer);
    loadingWheelContainer.appendChild(loaderWheel);
    loaderWheel.appendChild(stroke);
    stroke.appendChild(strokeLeft);
    stroke.appendChild(strokeRight);

    return html;
}

const PaymentSDK = create({
  tag: 'payment-sdk',
  url: '/index.html', // This will be the URL of your built React app

  dimensions: {
    width: '100%',
    height: '300px',
  },

  prerenderTemplate: ({ doc }: { doc: Document }) => {
    return createLoadingSpinner(doc);
  },

  props: {
    config: {
      type: 'object',
      required: true,
    },
    onSuccess: {
      type: 'function',
      required: true,
    },
    onError: {
      type: 'function',
      required: true,
    },
    foo: {
      type: 'string',
      default: (props: unknown) => {
        console.log(props);
        return 'bar';
      },
      required: true,
    }
  },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).PaymentSDK = PaymentSDK;
