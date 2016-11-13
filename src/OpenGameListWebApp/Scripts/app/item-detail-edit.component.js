System.register(["@angular/core", "@angular/router", "./item", "./item.service"], function(exports_1, context_1) {
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
    var core_1, router_1, item_1, item_service_1;
    var ItemDetailEditComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (item_1_1) {
                item_1 = item_1_1;
            },
            function (item_service_1_1) {
                item_service_1 = item_service_1_1;
            }],
        execute: function() {
            ItemDetailEditComponent = (function () {
                function ItemDetailEditComponent(itemService, router, activatedRoute) {
                    this.itemService = itemService;
                    this.router = router;
                    this.activatedRoute = activatedRoute;
                }
                ItemDetailEditComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    var id = +this.activatedRoute.snapshot.params['id'];
                    if (id) {
                        this.itemService.get(id).subscribe(function (item) { return _this.item = item; });
                    }
                    else if (id === 0) {
                        console.log("id is 0: adding a new item...");
                        this.item = new item_1.Item(0, "New Item", null);
                    }
                    else {
                        console.log("Invalid id: routing back to home...");
                        this.router.navigate([""]);
                    }
                };
                ItemDetailEditComponent.prototype.onInsert = function (item) {
                    var _this = this;
                    this.itemService.add(item).subscribe(function (data) {
                        _this.item = data;
                        console.log("Item " + _this.item.Id + " has been added.");
                        _this.router.navigate([""]);
                    }, function (error) { return console.log(error); });
                };
                ItemDetailEditComponent.prototype.onBack = function () {
                    this.router.navigate([""]);
                };
                ItemDetailEditComponent.prototype.onItemDetailView = function (item) {
                    this.router.navigate(["item/view", item.Id]);
                };
                ItemDetailEditComponent.prototype.onUpdate = function (item) {
                    var _this = this;
                    this.itemService.update(item).subscribe(function (data) {
                        _this.item = data;
                        console.log("Item " + _this.item.Id + " has been updated.");
                        _this.router.navigate(["item/view", _this.item.Id]);
                    }, function (error) { return console.log(error); });
                };
                ItemDetailEditComponent.prototype.onDelete = function (item) {
                    var _this = this;
                    var id = item.Id;
                    this.itemService.delete(id).subscribe(function (data) {
                        console.log("Item " + id + " has been deleted.");
                        _this.router.navigate([""]);
                    }, function (error) { return console.log(error); });
                };
                ItemDetailEditComponent = __decorate([
                    core_1.Component({
                        selector: "item-detail",
                        template: " \n           <div *ngIf=\"item\" class=\"item-container\">\n                <div class=\"item-tab-menu\">\n                    <span class=\"selected\">Edit</span>\n                    <span *ngIf=\"item.Id != 0\" (click)=\"onItemDetailView(item)\">View</span>\n                </div>\n                <div class=\"item-details\">\n                    <div class=\"mode\">Edit Mode</div>\n                    <h2>{{item.Title}}</h2> \n                    <ul> \n                        <li> \n                            <label>Title:</label> \n                            <input [(ngModel)]=\"item.Title\" placeholder=\"Insert the title...\" /> \n                        </li> \n                        <li> \n                            <label>Description:</label> \n                            <textarea [(ngModel)]=\"item.Description\" placeholder=\"Insert a suitable description...\"></textarea> \n                        </li> \n                    </ul> \n                    <div *ngIf=\"item.Id == 0\" class=\"commands insert\"> \n                        <input type=\"button\" value=\"Save\" (click)=\"onInsert(item)\" /> \n                        <input type=\"button\" value=\"Cancel\" (click)=\"onBack()\" /> \n                    </div> \n                    <div *ngIf=\"item.Id != 0\" class=\"commands update\"> \n                        <input type=\"button\" value=\"Update\" (click)=\"onUpdate(item)\" /> \n                        <input type=\"button\" value=\"Delete\" (click)=\"onDelete(item)\" /> \n                        <input type=\"button\" value=\"Cancel\" (click)=\"onItemDetailView(item)\" /> \n                    </div> \n                </div> \n            </div>\n    ",
                        styles: [" \n            .item-container {   \n                width: 600px; \n            } \n \n            .item-tab-menu { \n                margin-right: 30px; \n            } \n \n            .item-tab-menu span { \n                background-color: #dddddd; \n                border: 1px solid #666666; \n                border-bottom: 0; \n                cursor: pointer; \n                display: block; \n                float: right; \n                margin: 0 0 -1px 5px; \n                padding: 5px 10px 4px 10px; \n                text-align: center; \n                width: 60px; \n            } \n \n            .item-tab-menu span.selected { \n                background-color: #eeeeee; \n                cursor: auto; \n                font-weight: bold; \n                padding-bottom: 5px; \n            } \n \n            .item-details { \n                background-color: #eeeeee; \n                border: 1px solid black; \n                clear: both; \n                margin: 0; \n                padding: 5px 10px; \n            } \n \n            .item-details * { \n                vertical-align: middle; \n            } \n \n            .item-details .mode { \n                font-size: 0.8em; \n                color: #777777; \n            } \n \n            .item-details ul li { \n                padding: 5px 0; \n            } \n \n            .item-details input[type=\"text\"] { \n                display: block; \n                width: 100%; \n            } \n \n            .item-details textarea { \n                display: block; \n                width: 100%; \n                height: 60px; \n            } \n \n            .commands { \n                text-align: right; \n                margin: 10px 20px 10px 10px; \n            }       \n    "]
                    }), 
                    __metadata('design:paramtypes', [item_service_1.ItemService, router_1.Router, router_1.ActivatedRoute])
                ], ItemDetailEditComponent);
                return ItemDetailEditComponent;
            }());
            exports_1("ItemDetailEditComponent", ItemDetailEditComponent);
        }
    }
});
