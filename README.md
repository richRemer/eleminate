eleminate
=========
Function to create DOM elements.

Using eleminate
---------------

```js
// must provide document object to use eleminate function
var el = require("eleminate")(document);

// create empty element
var br = el("br");

// create element with text content
var span = el("span", "Foo!");

// create element with attributes set
var section = el("section" {"class": "main"});

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
