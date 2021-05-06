import { Injectable } from '@angular/core';

import { ComponentItem } from '../directive/component-item';
import { BannerSlideComponent } from '../../components/banner-slide/banner-slide.component';

@Injectable({
    providedIn: 'root'
})
export class ComponentService {
  getComponents() {
    return [
      new ComponentItem(BannerSlideComponent)
    ];
  }
}