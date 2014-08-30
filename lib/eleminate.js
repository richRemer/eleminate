/**
 * Bind a document and return the eleminate function
 * @param {HTMLDocument} document
 * @return {function}
 */
function eleminate(document) {
    /**
     * Create a new element.  If text and children are provided, the text
     * will be used as a delimiter between the child elements.
     * @param {string} name
     * @param {object} [attrs]
     * @param {array} [children]
     * @param {string} [text]
     * @return {HTMLElement}
     */
    return function(name, attrs, children, text) {
        // process optional args
        switch (arguments.length) {
            case 2:
                if (attrs instanceof Array)
                    children = attrs, attrs = {};
                else if (typeof attrs === "string")
                    text = attrs, attrs = {};
            case 3:
                if (attrs instanceof Array)
                    text = children, children = attrs, attrs = {};
                else if (typeof children === "string")
                    text = children, children = [];
        }
        
        // fallbacks for missing args
        attrs = attrs || {};
        children = children || [];
        text = text || "";

        var el = document.createElement(name),
            childAdded = false;

        // set attributes        
        for (var attr in attrs)
            el.setAttribute(attr, attrs[attr]);
        
        // append children, with text between
        children.forEach(function(child) {
            // add intermediary text nodes between children
            if (childAdded && text)
                el.appendChild(document.createTextNode(text));
            
            // add the child and set flag so we know to add intermediary text
            el.appendChild(child);
            childAdded = true;
        });
        
        // if there were no children to add, just add text node
        if (children.length === 0 && text)
            el.appendChild(document.createTextNode(text));
        
        // return the new element
        return el;
    }
}

// eleminate is already global in browser environment; export for server environment
if (typeof module !== "undefined" && module.exports) module.exports = eleminate;
