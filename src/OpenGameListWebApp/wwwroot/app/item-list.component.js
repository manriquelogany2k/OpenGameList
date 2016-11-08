System.register(["@angular/core","./item.service"],function(exports_1,context_1){"use strict";var core_1,item_service_1,ItemListComponent,__decorate=(context_1&&context_1.id,this&&this.__decorate||function(decorators,target,key,desc){var d,c=arguments.length,r=c<3?target:null===desc?desc=Object.getOwnPropertyDescriptor(target,key):desc;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)(d=decorators[i])&&(r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r);return c>3&&r&&Object.defineProperty(target,key,r),r}),__metadata=this&&this.__metadata||function(k,v){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(k,v)};return{setters:[function(core_1_1){core_1=core_1_1},function(item_service_1_1){item_service_1=item_service_1_1}],execute:function(){ItemListComponent=function(){function ItemListComponent(itemService){this.itemService=itemService}return ItemListComponent.prototype.ngOnInit=function(){this.getLatest()},ItemListComponent.prototype.getLatest=function(){var _this=this;this.itemService.getLatest().subscribe(function(latestItems){return _this.items=latestItems},function(error){return _this.errorMessage=error})},ItemListComponent.prototype.onSelect=function(item){this.selectedItem=item,console.log("item with Id "+this.selectedItem.Id+" has been selected.")},ItemListComponent=__decorate([core_1.Component({selector:"item-list",template:' \n        <h2>Latest Items:</h2> \n            <ul class="items"> \n            <li *ngFor="let item of items"   [class.selected]="item === selectedItem"   (click)="onSelect(item)"> \n                <span>{{item.Title}}</span> \n            </li> \n        </ul> \n        <item-detail *ngIf="selectedItem" [item]="selectedItem"></item-detail>\n    ',styles:[" \n        ul.items li {  \n            cursor: pointer; \n        } \n        ul.items li.selected {  \n            background-color: #cccccc;  \n        } \n    "]}),__metadata("design:paramtypes",[item_service_1.ItemService])],ItemListComponent)}(),exports_1("ItemListComponent",ItemListComponent)}}});
//# sourceMappingURL=item-list.component.js.map
