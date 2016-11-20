import {Injectable} from "@angular/core";
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Item} from "./item";
import {AuthHttp} from "./auth.http";

@Injectable()
export class ItemService {
    constructor(private http: AuthHttp) { }

    private baseUrl = "api/items/";

    getLatest(num?: number) {
        let url = this.baseUrl + "GetLatest/";
        if (num != null) { url += num; }

        return this.http.get(url)
            .map(response => response.json())
            .catch(this.handleError);
    }

    getMostViewed(num?: number) {
        let url = this.baseUrl + "GetMostViewed/";
        if (num != null) { url += num; }

        return this.http.get(url)
            .map(response => response.json())
            .catch(this.handleError);
    }

    getRandom(num?: number) {
        let url = this.baseUrl + "GetRandom/";
        if (num != null) { url += num; }

        return this.http.get(url)
            .map(response => response.json())
            .catch(this.handleError);
    }

    get(id: number) {
        if (id == null) { throw new Error("id is required."); }
        const url = this.baseUrl + id;

        return this.http.get(url)
            .map(res => <Item>res.json())
            .catch(this.handleError);
    }

    add(item: Item) {

        return this.http.post(this.baseUrl, JSON.stringify(item), this.getRequestOptions())
            .map(response => response.json())
            .catch(this.handleError);

    }

    update(item: Item) {
        let url = this.baseUrl + item.Id;

        return this.http.put(url, JSON.stringify(item), this.getRequestOptions())
            .map(response => response.json())
            .catch(this.handleError);
    }

    delete(id: number) {
        let url = this.baseUrl + id;
        return this.http.delete(url).catch(this.handleError);
    }


    private getRequestOptions() {
        return new RequestOptions({headers: new Headers({"Content-Type": "application/json"})});
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || "Server error");
    }
} 