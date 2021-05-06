import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef, Inject, PLATFORM_ID} from '@angular/core';
import { ApiService, environment, takeUntil, Subject } from '../index';

import { ComponentItem } from '../../shared/directive/component-item';
import { ComponentService } from '../../shared/service/component.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  // @ViewChild('main', { read: ViewContainerRef }) main: ViewContainerRef;
  @ViewChild('compHost', { read: ViewContainerRef }) compHost: ViewContainerRef;
  // @ViewChild(ComponentDirective, {static: true}) compHost: ComponentDirective;
  private readonly unSubs = new Subject<void>();
  private components: ComponentItem[];
  private data:any;

  constructor(private resolver: ComponentFactoryResolver,
             private apiService : ApiService,
             private componentService: ComponentService,
             @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    this.getData();
  }

  private getData(){
    this.components = this.componentService.getComponents();
    this.apiService.getDataApi('page/home')
      .pipe(takeUntil(this.unSubs))
      .subscribe(res => { 
        this.reorder(res.components);
        this.data.forEach((v, i) => {
          console.log(v.component_render.data)
          this.createComponent(0, v.component_render.data);
        });
      });
  }

  private reorder(res){
    this.data = res.sort(function(a, b) {
      if (a.order < b.order) return -1;
      if (a.order > b.order) return 1;
      return 0;
    });
  }

  private createComponent(flag, data) {
    const compItem = this.components[flag];
    const componentFactory = this.resolver.resolveComponentFactory(compItem.component);
    this.compHost.clear();
    const componentRef = this.compHost.createComponent<any>(componentFactory);
    componentRef.instance.CompData = data;
  }

  ngOnDestroy(){
    this.unSubs.next();
    this.unSubs.complete();
  }

}
