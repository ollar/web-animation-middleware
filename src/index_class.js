function checkAnimationAvailable(fn) {
    if (!Element.prototype.animate) {
      return () => true;
    }

    return fn;
}

function chainAnimate(elems, steps, options, next) {
  var _elems = Array.prototype.slice.call(elems);
  var anim = _elems[0].animate(steps, options);

  if (_elems.length > 1) {
    anim.onfinish = () => chainAnimate(_elems.slice(1), steps, options, next);
  } else {
    anim.onfinish = next;
  }
}

class Middleware {
  use(func) {
    this.go = (function(_go, _this) {
      return function(next) {
        return _go.call(_this, function() {
          return func.call(_this, next.bind(_this));
        })
      };
    })(this.go, this)

    return this;
  }

  go(next) {
    return window.requestAnimationFrame(next);
  }

  prepare($el, cssOptions) {
    return this.use(next => {
      if ($el instanceof NodeList) {
        $el.forEach(_el => Object.keys(cssOptions).forEach(key => _el.style[key] = cssOptions[key]));
      } else {
        Object.keys(cssOptions).forEach(key => $el.style[key] = cssOptions[key]);
      }
      next();
    });
  }

  step($elem, steps, options) {
    return this.use((next) => {
      $elem.animate(steps, options).onfinish = next;
    });
  }

  chain(elems, steps, options) {
    return this.use((next) => {
      return chainAnimate.call(this, elems, steps, options, next);
    });
  }
}

Middleware.prototype.use = checkAnimationAvailable(Middleware.prototype.use);
Middleware.prototype.prepare = checkAnimationAvailable(Middleware.prototype.prepare);
Middleware.prototype.go = checkAnimationAvailable(Middleware.prototype.go);

export default Middleware;