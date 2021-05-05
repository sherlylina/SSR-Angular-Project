import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef, Inject, PLATFORM_ID} from '@angular/core';
import { ApiService, environment, takeUntil, Subject } from '../index';
import { ComponentLookupRegistry } from 'src/app/shared/directive/classLookup.directive';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  @ViewChild('main', { read: ViewContainerRef }) main: ViewContainerRef;
  private readonly unSubs = new Subject<void>();
  private componentRef: any;
  private data:any

  constructor(private resolver: ComponentFactoryResolver,
             private apiService : ApiService,
             @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    this.getData();
  }

  private getData(){
    this.apiService.getDataApi('page/home')
      .pipe(takeUntil(this.unSubs))
      .subscribe(res => { 
        // console.log('a');
        // console.log(res);
        this.reorder(res);
        // console.log(this.data);
        this.data.forEach(v => {
          let classN = v.component_definition.title + 'Component';
          this.createComponent(classN, v.component_render.data);
        });
      });
  }

  private reorder(res){
    this.data = res.components.sort(function(a, b) {
      if (a.order < b.order) return -1;
      if (a.order > b.order) return 1;
      return 0;
    });
  }

  private createComponent(comp, data) {
    if (isPlatformBrowser(this.platformId)) {
      let classN = ComponentLookupRegistry.get(comp);
      let factory = this.resolver.resolveComponentFactory(classN);
      this.componentRef = this.main.createComponent(factory);
      this.componentRef.instance.CompData = data;
      // console.log(this.componentRef.instance.CompData)
    }
  }

  ngOnDestroy(){
    this.unSubs.next();
    this.unSubs.complete();
  }

}
