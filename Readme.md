# Web animation wrapper

Web animations are rather cool, and seems ready to replace other solutions in future.

Animation middleware wrapper over standard Web Animation Api.

A gracefull degradation is used with browsers without WAA support and no animation will run.
Or you can use a polyfill!

## Basic usage

### Appear animation

create animation instance

```javascript
var an = new WAM();
```

get element you wish to animate

```javascript
var $el = document.querySelector('#moving-bestia');
```

prepare element for the first step (eg hide it or move it away)

```javascript
an.prepare($el, {opacity: 0});
```

set first animation step

```javascript
an.step($el, {opacity: [0, 1]}, {duration: 300})
```

run animation

```javascript
an.go(() => console.log(complete))
```

### Multiple elements animation


```javascript
var an = new WAM();
var $els = document.querySelectorAll('.balls');

an.prepare($els, {opacity: 0});

an.chain($els, {opacity: [0, 1]}, {duration: 100});

an.go(() => console.log(complete));
```

### Mixing animations


```javascript
var an = new WAM();

var $el = document.querySelector('#moving-bestia');
var $els = document.querySelectorAll('.balls');

an
    .prepare($el, {opacity: 0});
    .prepare($els, {opacity: 0});
    .step($el, {opacity: [0, 1]}, {duration: 300})
    .chain($els, {opacity: [0, 1]}, {duration: 100})
    .go(() => console.log(complete));
```

### Usefull links

[https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API)

[https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Using_the_Web_Animations_API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Using_the_Web_Animations_API)

##Demo

See demo in ./demo folder!