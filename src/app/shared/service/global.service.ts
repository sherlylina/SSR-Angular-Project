import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private title: Title, private meta: Meta) { }

  // Loading
  isLoading = new BehaviorSubject<boolean>(false);

  // String Cut
  trimString(data:string) {
    if (data.length > 60) {
      data = data.substring(0, 57) + '...';
    }
    return data;
  }

  // String Cut
  trimString2(string:string, trim:number) {
    if (string.length > (trim + 5)) {
      string = string.substring(0, trim) + '...';
    }
    return string;
  }

  // Meta
  updateMeta(title:string, keyw:string, desc:string) {
    this.title.setTitle(title + ' | Angular SSR');
    this.meta.updateTag({ name: 'title', content: title + ' | Angular SSR' });
    this.meta.updateTag({ name: 'keywords', content: keyw });
    this.meta.updateTag({ name: 'description', content: desc });
  }

}
