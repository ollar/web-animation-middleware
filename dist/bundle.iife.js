var WAM = (function () {
'use strict';

/**
 * Checks if browser is compatible for animation api
 * Otherwise replace your gorgeous animation function with simple skip function.
 *
 * @param  {Function} fn - function to wrap
 * @return {Function}
 */
function checkAnimationAvailable(fn) {
    if (!Element.prototype.animate) {
      // skip all steps
      return () => true;
    }

    return fn;
}


/**
 * Chain animation function.
 *
 * @param  {NodeList} elems - elements to animate
 * @param  {Object} steps - web animations keyframes
 * @param  {Object} options - web animations options
 * @param  {Function} next - next animation
 */
function chainAnimate(elems, steps, options, next) {
  var _elems = Array.prototype.slice.call(elems);
  var anim = _elems[0].animate(steps, options);

  if (_elems.length > 1) {
    anim.onfinish = () => chainAnimate(_elems.slice(1), steps, options, next);
  } else {
    anim.onfinish = next;
  }
}

var Middleware = function() {};

/**
 * Add function to run stack
 *
 * @param {Function} func - function to place in stack
 * @return {Middleware}
 */
Middleware.prototype.use = function(func) {
  this.go = (function(_go, _this) {
    return function(next) {
      return _go.call(_this, function() {
        return func.call(_this, next.bind(_this));
      })
    };
  })(this.go, this);

  return this;
};


/**
 * Runs middleware
 *
 * @param  {Function} next - function to run on complete
 */
Middleware.prototype.go = function(next) {
  return window.requestAnimationFrame(next);
};


/**
 * Make preparations for the first scene.
 * @param  {Element} $el - element to animate
 * @param  {Object} cssOptions - css options
 */
Middleware.prototype.prepare = function($el, cssOptions) {
  return this.use(next => {
    if ($el instanceof NodeList) {
      $el.forEach(_el => Object.keys(cssOptions).forEach(key => _el.style[key] = cssOptions[key]));
    } else {
      Object.keys(cssOptions).forEach(key => $el.style[key] = cssOptions[key]);
    }
    next();
  });
};


/**
 * Run simple animation.
 * @param  {Element} $elem - element to animate
 * @param  {Object} steps - web animations keyframes
 * @param  {Object} options - web animations options
 */
Middleware.prototype.step = function($elem, steps, options) {
  return this.use((next) => {
    $elem.animate(steps, options).onfinish = next;
  });
};


/**
 * Run multiple element chained animation.
 * Applies similar animation on every element and run it one by one.
 *
 * @param  {NodeList} $elems - elements to animate
 * @param  {Object} steps - web animations keyframes
 * @param  {Object} options - web animations options
 */
Middleware.prototype.chain = function($elems, steps, options) {
  return this.use((next) => {
    return chainAnimate.call(this, $elems, steps, options, next);
  });
};


Middleware.prototype.use = checkAnimationAvailable(Middleware.prototype.use);
Middleware.prototype.prepare = checkAnimationAvailable(Middleware.prototype.prepare);
Middleware.prototype.go = checkAnimationAvailable(Middleware.prototype.go);

return Middleware;

}());
