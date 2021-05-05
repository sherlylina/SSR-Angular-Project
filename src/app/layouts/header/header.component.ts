import { Component, OnInit, Renderer2, ElementRef, ViewChild,Inject, PLATFORM_ID} from '@angular/core';
import { Router } from '@angular/router';

// Service
import { ApiService } from 'src/app/shared/service/api.service';

// env
import { environment as env } from "src/environments/environment";

// interface
import { Menu } from './Menu';

import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  openSearch = false;
  openListMenu = false; // for mobile
  search;
  lang;
  listLang: Array<string> = ['en', 'id'];
  menu: Menu;
  menuOption = {
    two_colom : ['service'],
    no_child: ['produk'],
  };

  constructor(
    private renderer: Renderer2,
    private elem: ElementRef,
    private apiService: ApiService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  async ngOnInit(){
    // Lang
    if (isPlatformBrowser(this.platformId)) {
      const lang = JSON.parse(localStorage.getItem('lang'))
      this.lang = lang ? lang : env.API_LANG
    }

    // Menu
    let getMenu = await this.apiService.getApi(`menu/${this.lang}`);
    this.menu = getMenu.map(v => {
      return {
        text : v.menu_langs.name,
        url : (v.url ? v.url.split('#')[0] : ''),
        anchor : (v.url ? v.url.split('#')[0] : false), // boolean | string
        two_colom : this.menuOption.two_colom.includes(v.title),
        no_child : this.menuOption.no_child.includes(v.title),
        children: v.menu.length > 0 ? v.menu.map(child => {
          return {
            text : child.menu_langs.name,
            url : (child.url ? child.url.split('#')[0] : ''),
            anchor : (child.url ? child.url.split('#')[1] : false), // boolean | string
          };
        }) : false
      };
    });

    // console.log(this.menu);

  }



  //  function click able

  onOpenSearch(ev){
    ev.stopPropagation();
    this.openSearch =  true;
  }

  onCloseSearch(){
    this.openSearch = false;
  }

  onSearch(ev){
    // console.log(this.search);
    if (ev.keyCode === 13 || ev.type === 'click' ) {
      this.router.navigate(['/search'], { queryParams: { key: this.search } });
      this.closeMenu();
    }
  }

  onOpenMenuMobile(){
    this.openListMenu = !this.openListMenu;
    if ( this.openListMenu === true ){
      this.renderer.addClass(document.body, 'overflow-hidden');
    }else{
      this.renderer.removeClass(document.body, 'overflow-hidden');
      this.closeMenu();
    }
  }

  changeLanguage(param){
    if (param != this.lang){

      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('lang', JSON.stringify(param))
      }
      location.reload();

      // if (typeof(Storage) !== 'undefined') {
      //   window.localStorage.setItem('lang', JSON.stringify(param));
      // }
    }
  }

  closeMenu(){
    this.openListMenu = false;
    this.renderer.removeClass(document.body, 'overflow-hidden');
    const elements = this.elem.nativeElement.querySelectorAll('.w-title.parent');
    document.querySelector('.warp-menu').classList.remove('show');
    let i;
    for (i = 0; i < elements.length; i++) {
      this.renderer.removeClass(elements[i], 'active-m');
      this.renderer.removeClass(elements[i], 'active-d');
    }
  }

  listMenuMobile(ev){
    const target = ev.currentTarget;
    const parent = this.renderer.parentNode(target);
    const elements = this.elem.nativeElement.querySelectorAll('.w-title.parent');
    document.querySelector('.warp-menu').classList.remove('show');
    if (parent.classList.contains('active-m')){
      this.renderer.removeClass(parent, 'active-m');
    }else{
      let i;
      for (i = 0; i < elements.length; i++) {
        this.renderer.removeClass(elements[i], 'active-m');
      }
      this.renderer.addClass(parent, 'active-m');
    }
  }

  openDropdownD(ev){
    const target = ev.currentTarget;
    this.renderer.addClass(target, 'active-d');
    if (target.classList.contains('parent')) {
      document.querySelector('.warp-menu').classList.add('show');
    }
  }

  closeDropdownD(ev){
    const target = ev.currentTarget;
    this.renderer.removeClass(target, 'active-d');
    if (target.classList.contains('parent')) {
      document.querySelector('.warp-menu').classList.remove('show');
    }
  }

}
