import { ImageDefault, Source } from './../../interfaces';
import { Component, Input, OnInit } from '@angular/core';



@Component({
  selector: 'app-image-content',
  templateUrl: './image-content.component.html',
  styleUrls: ['./image-content.component.css']
})
export class ImageContentComponent implements OnInit {
  @Input() sources: Source[] = [];
  @Input() class: string = '';
  @Input() imgDefault: ImageDefault = {
    src: '',
    title: 'imagen'
  };
  showImage = true;

  constructor() { }

  ngOnInit(): void { }


  loadImage(media: string): string {
    const img = this.sources.find(img => img.media = media);
    return `${img?.src} ${img?.width}`;
  }

  error(e: any) {
    e.target.onerror = null;
    this.showImage = false;
  }

}
