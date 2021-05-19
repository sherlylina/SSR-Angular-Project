import { Injectable } from '@angular/core';

/* Dsirective */
import { ComponentItem } from '../directive/component-item';

/* Components */
import { BannerSlideComponent } from '../../components/banner-slide/banner-slide.component';

@Injectable({
    providedIn: 'root'
})
export class ComponentService {
  getComponents() {
    return {
      BannerSlide: new ComponentItem(BannerSlideComponent)
    };
  }
}