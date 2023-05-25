import { AfterViewInit, Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-admin-aside-component',
  templateUrl: './admin-aside-component.component.html',
  styleUrls: ['./admin-aside-component.component.css']
})
export class AdminAsideComponentComponent implements AfterViewInit {
  public messages = new Array(6);

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {}

  ngAfterViewInit(): void {
    this.renderer.removeStyle(this.elementRef.nativeElement, 'display');
  }

}
