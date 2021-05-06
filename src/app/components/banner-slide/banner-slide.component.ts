import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

// env
import { environment as env } from "src/environments/environment";

// plugin
import { OwlOptions, SlidesOutputData } from 'ngx-owl-carousel-o';

// interface
import { ApiService } from '../../shared/service/api.service';

@Component({
  selector: 'app-banner-slide',
  templateUrl: './banner-slide.component.html',
  styles: [
  ]
})
export class BannerSlideComponent implements OnInit, OnChanges {

  @Input() CompData:any;
  path:string = env.API_URL + "/storage/banners/"
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    nav: false,
    navSpeed: 500,
    dotsSpeed: 500,
    // animateOut: 'fadeOut',
    responsive: {
      0: {
        items: 1
      },
    },
  }
  lang:string;

  constructor(
    private router: Router,
    private elem: ElementRef,
    private apiService: ApiService
  ) { }


  ngOnInit(): void {
    this.lang = this.apiService.isLang();
  }

  ngOnChanges(changes: SimpleChanges){
    // if (changes['dataAction']) {
    //   console.log(changes['dataAction']);
    // }
    // console.log(this.CompData)
    // console.log('bb')
    // console.log(changes);
    // this.banner = this.CompData.map(v => {
    //   return {
    //     file : this.path + v.filename,
    //     title : v.lang.description,
    //     title_color : 'text-black',
    //     summary : v.lang.sub_description,
    //     summary_color : 'text-black',
    //     type : v.type,
    //     link : v.url
    //   }
    // })
  }

  goTo(url) {
    this.router.navigateByUrl(url);
  }

  onChangeSlide(data: SlidesOutputData){
    const {startPosition : pos} = data

    // reset type video
    const videoReset = this.elem.nativeElement.querySelectorAll('video');
    if(videoReset.length > 0) {
      videoReset[0].muted = true;
      videoReset[0].pause();
    }

    // reset type embed
    const embedReset = this.elem.nativeElement.querySelectorAll('iframe');
    if(embedReset.length > 0){
      let a = embedReset[0].getAttribute('src');
      let b = a.replace('autoplay=1', 'autoplay=0');
      embedReset[0].setAttribute('src', b);
    }


    // change video active
    const curVideo = this.elem.nativeElement.querySelectorAll(`.banner-slide #video-${pos}`);
    if(curVideo.length > 0){
      curVideo[0].play();
    }

    // change embed active
    // gak dapet klo pke ElementRef
    const curEmbed = this.elem.nativeElement.querySelectorAll(`.banner-slide #embed-${pos}`);
    if(curEmbed.length > 0){
    }

  }

  
}
