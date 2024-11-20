class SnowFlakes extends HTMLElement{static observedAttributes=['flakes'];constructor(){super();this.attachShadow({mode:'open'});this.shadowRoot.innerHTML=`
        <style>${this.#cssStyles()}</style>
        <div class="snow-area"></div>
    `}get flakes(){return this.getAttribute('flakes')}set flakes(a){if(a===this.flakes)return;this.setAttribute('flakes',a)}attributeChangedCallback(A,b,c){A==='flakes'&&this.#letItSnow(c)}#letItSnow(_=100){for(let i=0;i<_;i++){const B=document.createElement('span'),C=this.#randomize(0.15,0.85),_c=this.#randomize(0,100);B.classList.add('snowflake');B.classList.add(`c${this.#randomize(1,3,!0)}`);B.style.left=`${_c}%`;B.style.width=B.style.height=`${C}vw`;B.style.setProperty('--drift',`${_c+2}%`);B.style.animationDelay=`${this.#randomize(0,100)}s`;this.shadowRoot.querySelector('.snow-area').appendChild(B)}}#randomize(_a,_b,d=!1){var D=Math.random()*(_b-_a)+_a;return d?Math.round(D):D}#cssStyles(){return`
          .snow-area {
            z-index: -1;
            height: 100vh;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            overflow: hidden;
          }

          .snowflake {
            opacity: 0.4;
            pointer-events: none;
            will-change: transform, opacity, left;
            border-radius: 50%;
            max-width: 8px;
            max-height: 8px;
            -webkit-animation-name: snowAnime;
            animation-name: snowAnime;
            -webkit-animation-duration: 5s;
            animation-duration: 5s;
            -webkit-animation-iteration-count: infinite;
            animation-iteration-count: infinite;
            position: absolute;
            -webkit-transform: translateY(-10px);
            transform: translateY(-10px);
          }

          .snowflake.c1 {
            background-color: rgba(255, 255, 255, 0.9);
          }

          .snowflake.c2 {
            background-color: #d6ffff;
            -webkit-animation-duration: 18s;
            animation-duration: 18s;
          }

          .snowflake.c3 {
            background-color: #fff;
            -webkit-animation-duration: 22s;
            animation-duration: 22s;
          }

          @-webkit-keyframes snowAnime {
            15%,
            95% {
              opacity: 1;
              left: var(--drift);
            }

            to {
              opacity: 0.8;
              -webkit-transform: translateY(110vh);
              transform: translateY(110vh);
            }
          }

          @keyframes snowAnime {
            15%,
            95% {
              opacity: 1;
            }

            to {
              opacity: 0.8;
              -webkit-transform: translateY(110vh);
              transform: translateY(110vh);
            }
          }
    `}}customElements.define('snow-flakes',SnowFlakes);