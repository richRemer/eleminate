eleminate
=========
Function to create DOM elements.

Using eleminate
---------------

```js
// must provide document object to use eleminate function
// Note: use browserify or include lib/eleminate.js for browser environment
var el = require("eleminate")(document);

// create empty element
var br = el("br");

// create element with text content
var span = el("span", "Foo!");

// create element with attributes set
var section = el("section", {"class": "main"});

// create element with text and attributes
var anchor = el("a", {href: "/"}, "Homepage");

// create element with children
var ul = el("ul", {id: "my_list"}, [
    el("li", "Apple"),
    el("li", "Banana")
]);

// pass text with children to act as delimiter
var nav = el("nav", [
    el("a", {href: "/"}, "Homepage"),
    el("a", {href: "/faq"}, "FAQ")
], " - ");  // hyphens between links
```

=== Namespaces

If you need to use namespaces, register the namespace prefix when creating the
eleminate function and pass the appropriate qualified name when calling the
eleminate function.

```js
var el = require("eleminate")(document, {
        // this is actually unnecessary because svg is predefined
        svg: "http://www.w3.org/2000/svg",
    });

var icon = el("svg:svg", {viewBox: "0 0 2 2"}, [
    el("svg:circle", {x:1, y:1, r:1, fill:"red"}),
    el("svg:line":, {x1:0, y1:0, x2:2, y2:2, stroke:"blue"})
])
```

The following namespaces are predefined, so you don't need to register them.  If
for some reason you want to override any of them, just pass the namespace as
normal to register the override.

 * html: http://www.w3.org/1999/xhtml
 * mathml: http://www.w3.org/1998/Math/MathML
 * svg: http://www.w3.org/2000/svg
 * xlink: http://www.w3.org/1999/xlink
 * xml: http://www.w3.org/XML/1998/namespace
 * xsl: http://www.w3.org/1999/XSL/Transform
 * xmlns: http://www.w3.org/2000/xmlns/
 * soap: http://schemas.xmlsoap.org/wsdl/soap/
 * wsdl: http://schemas.xmlsoap.org/wsdl/

