import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';

// Service
import { ApiService } from 'src/app/shared/service/api.service';

import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-ssr';

  constructor(private apiService: ApiService, @Inject(PLATFORM_ID) private platformId: Object){}

  ngOnInit(){
    if(isPlatformBrowser(this.platformId)){
      // Check browser support Local Storage for language
      let storageUrl = localStorage.getItem('language');
      if(storageUrl != null){
        // Check browser support Local Storage
        if (typeof(Storage) !== 'undefined') {
          // Store
          localStorage.setItem('language', storageUrl);
        } else {
          localStorage.setItem('language', 'en');
          storageUrl = localStorage.getItem('language');
        }
        this.apiService.lang.next(storageUrl);
      }else{
        this.apiService.lang.next('en');
        localStorage.setItem('language', 'en');
      }
    }
  } 

}
