module.exports = function (object, observerCallback) {
  var observing = true;
  const proxyObject = new Proxy(object, {
    set(object, property, value) {
      const hadProperty = Reflect.has(object, property);
      const oldValue = hadProperty && Reflect.get(object, property);
      const returnValue = Reflect.set(object, property, value);
      if (observing && hadProperty) {
        observerCallback({ object: proxyObject, type: 'update', name: property, oldValue: oldValue });
      } else if(observing) {
        observerCallback({ object: proxyObject, type: 'add', name: property });
      }
      return returnValue;
    },
    deleteProperty(object, property) {
      const hadProperty = Reflect.has(object, property);
      const oldValue = hadProperty && Reflect.get(object, property);
      const returnValue = Reflect.deleteProperty(object, property);
      if (observing && hadProperty) {
        observerCallback({ object: proxyObject, type: 'delete', name: property, oldValue: oldValue });
      }
      return returnValue;
    },
    defineProperty(object, property, descriptor) {
      const hadProperty = Reflect.has(object, property);
      const oldValue = hadProperty && Reflect.getOwnPropertyDescriptor(object, property);
      const returnValue = Reflect.defineProperty(object, property, descriptor);
      if (observing && hadProperty) {
        observerCallback({ object: proxyObject, type: 'reconfigure', name: property, oldValue: oldValue });
      } else if(observing) {
        observerCallback({ object: proxyObject, type: 'add', name: property });
      }
      return returnValue;
    },
    preventExtensions(object) {
      const returnValue = Reflect.preventExtensions(object);
      if (observing) {
        observerCallback({ object: proxyObject, type: 'preventExtensions' })
      }
      return returnValue;
    },
  });
  return { object: proxyObject, unobserve() { observing = false } };
}
