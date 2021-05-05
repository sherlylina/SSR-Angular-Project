import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: [
  ]
})
export class FooterComponent implements OnInit {

  ngOnInit(): void {
  }

  scrollToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }
    

}
