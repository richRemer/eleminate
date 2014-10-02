var document = require("jsdom").jsdom(),
    window = document.parentWindow,
    HTMLElement = window.HTMLElement,
    HTMLDivElement = window.HTMLDivElement,
    HTMLUListElement = window.HTMLUListElement,
    HTMLAnchorElement = window.HTMLAnchorElement,
    Text = window.Text,
    eleminate = require("..")(document),
    expect = require("expect.js");

describe("eleminate", function() {
    describe("w/ single argument", function() {
        it("should create a new document element", function() {
            var el = eleminate("div");
            expect(el).to.be.an(HTMLElement);
            expect(el).to.be.an(HTMLDivElement);
        });
    });
    
    describe("w/ optional object argument", function() {
        it("should set attributes", function() {
            var el = eleminate("div", {id: "foo"});
            expect(el.getAttribute("id")).to.be("foo");
        });

        it("should add event handler functions (not set attr)", function() {
            var el = eleminate("div", {onclick: function() {}});
            expect(el.getAttribute("onclick")).to.be(null);

            // NOTE: this doesn't actually test if addEventListener was called;
            // because the element creation and addEventListener call take
            // place in the eleminate function, a spy cannot be attached early
            // enough to detect it; DOM doesn't specify a way to retrieve added
            // event listeners
        });
    });

    describe("w/ optional array argument", function() {
        it("should add child elements", function() {
            var ul = eleminate("ul", [
                eleminate("li", "Apple"),
                eleminate("li", "Banana")
            ]);
            expect(ul).to.be.an(HTMLUListElement);
            expect(ul.childNodes.length).to.be(2);
        });
    });
    
    describe("w/ optional text argument", function() {
        it("should add text content", function() {
            var el = eleminate("div", "foo");
            expect(el.textContent).to.be("foo");
        });
    });
    
    describe("w/ child array and text content", function() {
        it("should delimit children by text", function() {
            var el = eleminate("nav", {id: "foo"}, [
                eleminate("a", {href: "/"}, "home"),
                eleminate("a", {href: "/faq"}, "faq")
            ], " - ");
            expect(el).to.be.an(HTMLElement);
            expect(el.childNodes.length).to.be(3);
            expect(el.childNodes[0]).to.be.an(HTMLAnchorElement);
            expect(el.childNodes[2]).to.be.an(HTMLAnchorElement);
            expect(el.childNodes[1]).to.be.a(Text);
            expect(el.childNodes[1].textContent).to.be(" - ");
        });
    });
    
    describe("w/ any valid arguments", function() {
        it("should recognize common namespaces", function() {
            var el = eleminate("svg:svg");
            expect(el.nodeName.toLowerCase()).to.be("svg");
            expect(el.namespaceURI).to.be("http://www.w3.org/2000/svg");
        });    
    });

    describe("factory function", function() {
        it("should accept application specific namespaces", function() {
            var eleminate = require("..")(document, {
                    foo: "http://example.com/ns/foo"
                }),
                el = eleminate("foo:bar");
            expect(el.nodeName.toLowerCase()).to.be("bar");
            expect(el.namespaceURI).to.be("http://example.com/ns/foo");
        });
    });
});
