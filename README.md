# text-zoom-resize

A library that will detect when a user zooms text in their browser.
This is a common use case for people who are visually impaired.

## Usage:

Initialize using `textZoomEvent.init()`:

```
// It is better if you give this the value of 
// parseFloat(getComputedStyle(document.documentElement).fontSize
// when the doc is not zoomed.
textZoomEvent.init(16);
```

You can find the current zoom factor using `textZoomEvent.resizeFactor()`:

```
console.log('on load, resize factor is ', textZoomEvent.resizeFactor());
```

You can also use the `textzoom` event to fire when the user zooms the text
with their browser:

```
document.addEventListener('textzoom', function (e) {
    console.log('ds', textZoomEvent.unzoomPixelValue, e.detail.resizeFactor());
});
```

How can you test?  Different browsers have different UIs for zooming text. 
The best place to find this information is:

https://usability.yale.edu/web-accessibility/articles/zoom-resizing-text
