System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Item;
    return {
        setters:[],
        execute: function() {
            Item = (function () {
                function Item(Id, Title, Description) {
                    this.Id = Id;
                    this.Title = Title;
                    this.Description = Description;
                }
                return Item;
            }());
            exports_1("Item", Item);
        }
    }
});
