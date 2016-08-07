## Proxy Object Observe

This super simple library uses ES6 Proxies to provide an API similar to the now deprecated Object.observe spec.

If you want to read more about Proxies, you can read the accompanying blog post; [Metaprogramming in ES6: Part 3 - Proxies](https://www.keithcirkel.co.uk/metaprogramming-in-es6-part-3-proxies/).

## Install:

```bash
npm i proxy-object-observe
```

## Usage:

Simply call the exported function with an object and a callback, and each time the object is modified the callback will be fired with some kind of change. The return value of the function is an object with the `object` key - which is the Proxied object, and the `unobserve` function, which - when called - will mean the callback is never fired again, making `object` behave like it was never proxied in the first place.

```js
const proxyMethodMissing = require('proxy-method-missing');
const changes = [];
const { object, unobserve } = observe({ id: 1 }, (change) => changes.push(change));
object.a = 'b';
object.id++;
Object.defineProperty(object, 'a', { enumerable: false });
delete object.a;
Object.preventExtensions(object);
assert.equal(changes.length, 5);
assert.equal(changes[0].object, object);
assert.equal(changes[0].type, 'add');
assert.equal(changes[0].name, 'a');
assert.equal(changes[1].object, object);
assert.equal(changes[1].type, 'update');
assert.equal(changes[1].name, 'id');
assert.equal(changes[1].oldValue, 1);
assert.equal(changes[2].object, object);
assert.equal(changes[2].type, 'reconfigure');
assert.equal(changes[2].oldValue.enumerable, true);
assert.equal(changes[3].object, object);
assert.equal(changes[3].type, 'delete');
assert.equal(changes[3].name, 'a');
assert.equal(changes[4].object, object);
assert.equal(changes[4].type, 'preventExtensions');
```

See the tests for a more in depth examples

## Contributing:

Feel free to contribute in any way you see fit. Keep in mind this repo follows the [Contributor Covenant](http://contributor-covenant.org/).

## License

```
Copyright © 2016 Keith Cirkel

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
