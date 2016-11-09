System.register(["@angular/core"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.title = "OpenGameList";
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: "opengamelist",
                        template: " \n                <h1>{{title}}</h1>\n                <item-list class=\"latest\"></item-list>\n                <item-list class=\"most-viewed\"></item-list>\n                <item-list class=\"random\"></item-list>\n                ",
                        styles: ["\n                item-list {\n                    min-width: 332px;\n                    border: 1px solid #aaaaaa;\n                    display: inline-block;\n                    margin: 0 10px;\n                    padding: 10px;\n                }\n\n                item-list.latest {\n                    background-color: #f9f9f9;\n                }\n\n                item-list.most-viewed {\n                    background-color: #f0f0f0;\n                }\n\n                item-list.random {\n                    background-color: #e9e9e9;\n        }\n    "]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
