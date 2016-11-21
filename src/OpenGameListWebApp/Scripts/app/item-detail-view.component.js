System.register(["@angular/core", "@angular/router", "./item.service", "./auth.service"], function(exports_1, context_1) {
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
    var core_1, router_1, item_service_1, auth_service_1;
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
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            }],
        execute: function() {
            ItemDetailViewComponent = (function () {
                function ItemDetailViewComponent(itemService, router, activatedRoute, authService) {
                    this.itemService = itemService;
                    this.router = router;
                    this.activatedRoute = activatedRoute;
                    this.authService = authService;
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
                    return false;
                };
                ItemDetailViewComponent.prototype.onBack = function () {
                    this.router.navigate(['']);
                };
                ItemDetailViewComponent = __decorate([
                    core_1.Component({
                        selector: "item-detail-view",
                        template: " \n            <div *ngIf=\"item\"> \n                <h2> \n                    <a href=\"#\" (click)=\"onBack()\">&laquo; Back to Home</a> \n                </h2> \n                <div class=\"item-container\"> \n                    <ul class=\"nav nav-tabs\"> \n                       <li *ngIf=\"authService.isLoggedIn()\" role=\"presentation\"> \n                            <a href=\"javascript:void(0)\" (click)=\"onItemDetailEdit(item)\">Edit</a> \n                        </li> \n                        <li role=\"presentation\" class=\"active\"> \n                            <a href=\"#\">View</a> \n                        </li> \n                    </ul> \n                    <div class=\"panel panel-default\"> \n                        <div class=\"panel-body\"> \n                            <div class=\"item-image-panel\"> \n                                <img src=\"/img/item-image-sample.png\" alt=\"{{item.Title}}\" /> \n                                <div class=\"caption\">Sample image with caption.</div> \n                            </div> \n                            <h3>{{item.Title}}</h3> \n                            <p>{{item.Description}}</p> \n                            <p>{{item.Text}}</p> \n                        </div> \n                    </div> \n                </div> \n            </div> \n    ",
                        styles: []
                    }), 
                    __metadata('design:paramtypes', [item_service_1.ItemService, router_1.Router, router_1.ActivatedRoute, auth_service_1.AuthService])
                ], ItemDetailViewComponent);
                return ItemDetailViewComponent;
            }());
            exports_1("ItemDetailViewComponent", ItemDetailViewComponent);
        }
    }
});
