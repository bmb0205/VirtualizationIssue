import { autoinject, bindable } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';
import { repo } from './repo';

@autoinject
export class Blogposts {

    @bindable count;

    constructor(
        public todos: any[],
        public localData: any[],
        private http: HttpClient,
        public repo: repo) {

        // local data used if line  49 is uncommented and the fetch request is commented
        this.localData = repo.localData;

        http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl('http://jsonplaceholder.typicode.com/')
                .withDefaults({
                    mode: 'cors',
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                        'X-Requested-With': 'Fetch'
                    }
                })
                .withInterceptor({
                    request(request) {
                        console.log(`Requesting ${request.method} ${request.url}`);
                        return request;
                    },
                    response(response) {
                        console.log(`Received ${response.status} ${response.statusText} ${response.url}`);
                        return response;
                    }
                });
        });
        this.http = http;
        this.count = 0;
    }

    /**
     * this is where my problem occurs
     */
    created() {

        // virtualization works on local data...        
        // uncomment below line and comment fetch request lines to test

        // this.todos = this.localData.slice(0, 100); 

        // virtualization does not work with either fetch or httpclient...
        // I have tried this dummy JSON API and also an ASP.NET server
        return this.http.fetch('todos')
            .then(response => response.json())
            .then(data => {

                // this.todos = data; // uncomment line and comment below line for full 5000 todos
                this.todos = data.slice(0, 100);
                console.log(this.todos.length);
                this.count = this.todos.length;
            })
            .catch(ex => {
                console.log(ex);
            });
    }

    // toggle property one filter
    public propOneSelected(completed) {

        if (completed.value) {
            completed.value = '';
        } else {
            completed.value = 'completed';
        }
    }

    // toggle property two filter
    public propTwoSelected(title) {
        if (title.value) {
            title.value = '';
        } else {
            title.value = 'title';
        }
    }

    public propThreeSelected(id) {
        if (id.value) {
            id.value = '';
        } else {
            id.value = 'id';
        }
    }
}
