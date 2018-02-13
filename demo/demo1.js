var $el = document.getElementById('demo');
var $els = document.querySelectorAll('li');

var md = new WAM();

md
    .prepare($el, {
        // initial css preparations
        top: '100px',
        left: '100px',
    })
    .step($el, [
        {top: '100px', backgroundColor: '#3e3'},
        {top: '300px', backgroundColor: 'yellow'},
    ], {
        duration: 300,
        fill: 'forwards',
    })
    .step($el, {left: ['100px', '400px']}, {duration: 300, fill: 'forwards',})
    .step($el, {top: ['300px', '100px']}, {duration: 300, fill: 'forwards',})
    .step($el, {left: ['400px', '100px']}, {duration: 300, fill: 'forwards',})
    .go(() => console.log('complete'))

var md2 = new WAM();

md2
    .prepare($els, {
        position: 'relative',
    })
    .chain($els, [
        {top: 0},
        {top: '100px'},
        {top: 0},
    ], {
        duration: 200
    })
    .go(() => true)
