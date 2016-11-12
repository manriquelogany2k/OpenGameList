System.register(["@angular/core", "@angular/router", "./item.service"], function(exports_1, context_1) {
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
    var core_1, router_1, item_service_1;
    var ItemDetailViewComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (item_service_1_1) {
                item_service_1 = item_service_1_1;
            }],
        execute: function() {
            ItemDetailViewComponent = (function () {
                function ItemDetailViewComponent(itemService, router, activatedRoute) {
                    this.itemService = itemService;
                    this.router = router;
                    this.activatedRoute = activatedRoute;
                }
                ItemDetailViewComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    var id = +this.activatedRoute.snapshot.params["id"];
                    if (id) {
                        this.itemService.get(id).subscribe(function (item) { return _this.item = item; });
                    }
                    else if (id === 0) {
                        console.log("id is 0: switching to edit mode...");
                        this.router.navigate(["item/edit", 0]);
                    }
                    else {
                        console.log("Invalid id: routing back to home...");
                        this.router.navigate([""]);
                    }
                };
                ItemDetailViewComponent.prototype.onItemDetailEdit = function (item) {
                    this.router.navigate(["item/edit", item.Id]);
                };
                ItemDetailViewComponent = __decorate([
                    core_1.Component({
                        selector: "item-detail-view",
                        template: " \n        <div *ngIf=\"item\" class=\"item-container\">\n            <div class=\"item-tab-menu\">\n                <span (click)=\"onItemDetailEdit(item)\">Edit</span>\n                <span class=\"selected\">View</span>\n            </div>\n            <div class=\"item-details\">\n                <div class=\"mode\">Display Mode</div> \n                <h2>{{item.Title}}</h2> \n                <p>{{item.Description}}</p> \n            </div> \n        </div>\n    ",
                        styles: [" \n        .item-container {   \n            width: 600px; \n        } \n \n        .item-tab-menu { \n            margin-right: 30px; \n        } \n \n        .item-tab-menu span { \n            background-color: #dddddd; \n            border: 1px solid #666666; \n            border-bottom: 0; \n            cursor: pointer; \n            display: block; \n            float: right; \n            margin: 0 0 -1px 5px; \n            padding: 5px 10px 4px 10px; \n            text-align: center; \n            width: 60px; \n        } \n \n        .item-tab-menu span.selected { \n            background-color: #eeeeee; \n            cursor: auto; \n            font-weight: bold; \n            padding-bottom: 5px; \n        } \n \n        .item-details { \n            background-color: #eeeeee; \n            border: 1px solid black; \n            clear: both; \n            margin: 0; \n            padding: 5px 10px; \n        } \n \n        .item-details * { \n            vertical-align: middle; \n        } \n \n        .item-details .mode { \n            font-size: 0.8em; \n            color: #777777; \n        } \n \n        .item-details ul li { \n            padding: 5px 0; \n        } \n    "]
                    }), 
                    __metadata('design:paramtypes', [item_service_1.ItemService, router_1.Router, router_1.ActivatedRoute])
                ], ItemDetailViewComponent);
                return ItemDetailViewComponent;
            }());
            exports_1("ItemDetailViewComponent", ItemDetailViewComponent);
        }
    }
});
