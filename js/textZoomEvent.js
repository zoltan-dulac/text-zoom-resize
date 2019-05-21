/*********************************************************
 * textResizeEvent.js - a library to capture text resize events
 * 
 * This library is to be used to help fix problems when trying
 * to comply with WCAG AA 1.4.4
 * 
 * https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-scale.html
 * 
 * by Zoltan Hawryluk (zoltan.dulac@gmail.com)
 * based on ideas by Hedgerwow, from a blog post retrieved from
 * The Wayback Machine:
 * 
 * https://web.archive.org/web/20061031093917/http://www.hedgerwow.com/360/dhtml/js-onfontresize.html
 * 
 * Code has been updated for modern web browsers, and is in the Public Domain.
 * 
 ********************************************************/

let textZoomEvent;

if (typeof document !== 'undefined') {
    (function () {
        if ( typeof window.CustomEvent === "function" ) return false;
      
        function CustomEvent ( event, params ) {
          params = params || { bubbles: false, cancelable: false, detail: null };
          var evt = document.createEvent( 'CustomEvent' );
          evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
          return evt;
         }
      
        CustomEvent.prototype = window.Event.prototype;
      
        window.CustomEvent = CustomEvent;
    })();


    textZoomEvent = new function () {
        let dFrame, dDiv;
        let fontSizeChangeEvent;
        let isInitialized = false;

        // pixel to rem conversion from https://tzi.fr/js/convert-em-in-px/ 
        function getRootElementFontSize() {
            // Returns a number
            return parseFloat(
            // of the computed font-size, so in px
            getComputedStyle(
                // for the root <html> element
                document.documentElement
            ).fontSize
            );
        }

        function convertRem(value) {
            return value * getRootElementFontSize();
        }

        this.resizeFactor = function () {
            return dDiv.offsetWidth / textZoomEvent.unzoomPixelValue;
        }

        this.forceFontBoosting = function (el) {
            const fontBoostFix = document.createElement('span');
            const testText = '&#8203;';
            const initialChars = 217;
            let forceFontBoostingStr = '';
            
            fontBoostFix.setAttribute('aria-hidden', 'true');
            
            for (let i=0; i<initialChars; i++ ) {
                forceFontBoostingStr += testText;
            }
            fontBoostFix.innerHTML = forceFontBoostingStr;
            //el.appendChild(fontBoostFix);
            el.innerHTML += forceFontBoostingStr;
            //el.style.cssText = 'position: static !important;';
            console.log(el.innerText, el.innerText.length)
            
        }

        const onFontSizeChangeHandler = function () {
            const r = dDiv.offsetWidth / 100;
            console.log('dFrame offsetWidth:', dFrame.offsetWidth);

            return !document.dispatchEvent(fontSizeChangeEvent);
        }

        this.init = function (unzoomPixelValue) {
            if (isInitialized) {
                return;
            }
            const b = document.body && document.body.firstChild;

            fontSizeChangeEvent = new CustomEvent('textzoom', {
                detail: {
                    resizeFactor: this.resizeFactor
                }
            });
            
            const forceFontBoostingEls = document.getElementsByClassName('force-font-boosting');
            for (let i=0; i<forceFontBoostingEls.length; i++) {
                this.forceFontBoosting(forceFontBoostingEls[i]);
            }
            this.unzoomPixelValue = unzoomPixelValue || convertRem(1);

            // Create IFRAME that we will attache resize event to.
            dFrame = document.createElement('IFRAME');
            dFrame.setAttribute('aria-hidden', 'true');
            dFrame.style.cssText = 'position:absolute;left:0;top:-100%;width:100%;height:100%;margin:1px 0 0;border:none;opacity:0;visibility:hidden;pointer-events:none;';
            dDiv = document.createElement('DIV');
            dDiv.style.cssText = "font-family: 'Roboto', sans-serif; box-sizing: border-box; position: relative; display: inline; font-size: 1em;"; //clip-path: polygon(0% 100%, 0% 100%);"
            const testText = '&#8203;';
            let forceFontBoostingStr = '<span style="box-sizing: border-box" aria-hidden="true">m'

            var initialChars = 217;
            for (var i=0; i<initialChars; i++ ) {
                forceFontBoostingStr += testText;
            }
            forceFontBoostingStr += '</span>'
            dDiv.innerHTML = forceFontBoostingStr;
            document.body.appendChild(dDiv);
            dDiv.appendChild(dFrame);

            const dWin = dFrame.contentWindow;
            dWin.addEventListener('resize', onFontSizeChangeHandler);
            isInitialized = true;
        }

    }
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
	module.exports = (textZoomEvent || new function () {});
}