"use strict";var textZoomEvent;"undefined"!=typeof document&&(function(){function a(a,b){b=b||{bubbles:!1,cancelable:!1,detail:null};var c=document.createEvent("CustomEvent");return c.initCustomEvent(a,b.bubbles,b.cancelable,b.detail),c}return"function"!=typeof window.CustomEvent&&void(a.prototype=window.Event.prototype,window.CustomEvent=a)}(),textZoomEvent=new function(){function a(){return parseFloat(getComputedStyle(document.documentElement).fontSize)}function c(b){return b*a()}var d,e,f=!1;this.resizeFactor=function(){return d.offsetWidth/textZoomEvent.unzoomPixelValue};var g=function(){d.offsetWidth/100;return!document.dispatchEvent(e)};this.init=function(a){if(!f){var h=document.body&&document.body.firstChild;e=new CustomEvent("textzoom",{detail:{resizeFactor:this.resizeFactor}}),this.unzoomPixelValue=a||c(1),d=document.createElement("IFRAME"),d.setAttribute("aria-hidden","true"),d.setAttribute("tabindex","-1"),document.body.insertBefore(d,h);var b=d.style;b.width="1em",b.height="1px",b.borderWidth=0,b.position="absolute",b.overflow="hidden",b.whiteSpace="nowrap",b.margin="-1px";var i=d.contentWindow,j=d.contentWindow||d.contentDocument||d.document;j=j.document||j;j.open(),j.write("<html style=\"width:100%;height:100%;padding:0;margin:0;overflow:hidden;\"><body style=\"width:100%;height:100%;padding:0;margin:0;overflow:hidden;\"></body></html>"),j.close(),i.addEventListener("resize",g),f=!0}}}),"undefined"!=typeof module&&"undefined"!=typeof module.exports&&(module.exports=textZoomEvent||new function(){});
