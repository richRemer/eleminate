/**
 * Bind a document and return the eleminate function.  Optionally, register namespace prefixes.
 * @param {HTMLDocument} document
 * @param {object} [namespaces]
 * @return {function}
 */
function eleminate(document, namespaces) {
    namespaces = namespaces || {};
    var autoNamespaces = {
        html: "http://www.w3.org/1999/xhtml",
        mathml: "http://www.w3.org/1998/Math/MathML",
        svg: "http://www.w3.org/2000/svg",
        xlink: "http://www.w3.org/1999/xlink",
        xml: "http://www.w3.org/XML/1998/namespace",
        xsl: "http://www.w3.org/1999/XSL/Transform",
        xmlns: "http://www.w3.org/2000/xmlns/",
        soap: "http://schemas.xmlsoap.org/wsdl/soap/",
        wsdl: "http://schemas.xmlsoap.org/wsdl/"
    };
    for (var prefix in autoNamespaces) if (!(prefix in namespaces))
        namespaces[prefix] = autoNamespaces[prefix];

    /**
     * Read a name or QName and return an object containing the namespace URI, local name, and prefix.
     * @param {string} name
     * @return {{ns:string, prefix:string, local:string}}
     */
    function readQName(name) {
        var pos = name.indexOf(":");
        return (pos >= 0)       // set "ns" and "prefix" to null for unqualified names
            ? {ns: namespaces[name.substr(0,pos)], prefix: name.substr(0,pos), local: name.substr(pos+1)}
            : {ns: null, prefix: null, local: name};
    }

    /**
     * Create a new element.  If text and children are provided, the text will be used as a delimiter between the child
     * elements.
     * @param {string} name
     * @param {object} [attrs]
     * @param {array} [children]
     * @param {string} [text]
     * @return {HTMLElement}
     */
    return function(name, attrs, children, text) {
        // process optional args
        if (arguments.length === 2 && attrs instanceof Array) children = attrs, attrs = [];
        else if (arguments.length === 2 && typeof attrs === "string") text = attrs, attrs = {};
        else if (arguments.length === 3 && attrs instanceof Array) text = children, children = attrs, attrs = {};
        else if (arguments.length === 3 && typeof children === "string") text = children, children = [];
        
        // fallbacks for missing args
        attrs = attrs || {};
        children = children || [];
        text = text || "";

        var el, qname,
            childAdded = false;

        // create the new element
        qname = readQName(name);
        el = qname.ns
            ? document.createElementNS(qname.ns, qname.local)
            : document.createElement(name);

        // set attributes
        for (var attr in attrs) {
            // add event listeners instead of attribute value for functions
            if (typeof attrs[attr] === "function" && /^on[a-z]+$/.test(attr)) {
                el.addEventListener(attr.substr(2), attrs[attr]);
            }

            // set attribute for everything else
            else {
                qname = readQName(attr);
                if(qname.ns) el.setAttributeNS(qname.ns, qname.local, attrs[attr])
                else el.setAttribute(attr, attrs[attr]);
            }
        }
        
        // append children, with text between
        children.forEach(function(child) {
            // add intermediary text nodes between children
            if (childAdded && text) el.appendChild(document.createTextNode(text));
            
            // add the child and set flag so we know to add intermediary text
            el.appendChild(child);
            childAdded = true;
        });
        
        // if there were no children to add, just add text node
        if (children.length === 0 && text) el.appendChild(document.createTextNode(text));
        
        // return the new element
        return el;
    }
}

// eleminate is already global in browser environment; export for server environment
if (typeof module !== "undefined" && module.exports) module.exports = eleminate;
