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
    it("should create a new document element", function() {
        var el = eleminate("div");
        expect(el).to.be.an(HTMLElement);
        expect(el).to.be.an(HTMLDivElement);
    });
    
    it("should optionally set attributes", function() {
        var el = eleminate("div", {id: "foo"});
        expect(el.getAttribute("id")).to.be("foo");
    });
    
    it("should optionally add child elements", function() {
        var ul = eleminate("ul", [
            eleminate("li", "Apple"),
            eleminate("li", "Banana")
        ]);
        expect(ul).to.be.an(HTMLUListElement);
        expect(ul.childNodes.length).to.be(2);
    });
    
    it("should optionally add text content", function() {
        var el = eleminate("div", "foo");
        expect(el.textContent).to.be("foo");
    });
    
    it("should treat text as delimiter if children set", function() {
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
