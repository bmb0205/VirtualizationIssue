import { autoinject, bindable } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';
import {repo} from './repo';

@autoinject
export class Blogposts {
    constructor(
        public photos: any[],
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
    }

    /**
     * this is where my problem occurs
     */
    created() {

        // virtualization works on local data...        
        // uncomment below line and comment fetch request lines to test
        
        this.photos = this.localData.slice(0, 100); 

        // virtualization does not work with either fetch or httpclient...
        // I have tried this dummy JSON API and also an ASP.NET server
        // this.http.fetch('photos')
        //     .then(response => response.json())
        //     .then(data => { 
                
        //         // this.photos = data; // uncomment line and comment below line for full 5000 photos
        //         this.photos = data.slice(0, 500);
        //         console.log(this.photos.length);
        //         })
        //     .catch(ex => {
        //         console.log(ex);
        //     });
    }
}
