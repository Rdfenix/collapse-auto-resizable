import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  AfterContentInit,
  AfterContentChecked,
  Input
} from '@angular/core';

interface Dict<T> {
  [key: string]: number
}
@Component({
  selector: 'app-collapse',
  templateUrl: './collapse.component.html',
  styleUrls: ['./collapse.component.scss']
})
export class CollapseComponent implements OnInit, OnDestroy, AfterContentInit, AfterContentChecked {

  @Input() index = 0;
  @Output() whenOpen = new EventEmitter();

  @ViewChild('collapseSection') collapse!: ElementRef<HTMLDivElement>;
  @ViewChild("collapsecontent") collapsecontent!: ElementRef<HTMLDivElement>;

  isOpned = false;
  content = '';
  private scrollHeight!: Dict<number>;

  constructor() {
    this.scrollHeight = {};
  }

  ngOnInit(): void { }

  ngAfterContentInit(): void {
    this.scrollHeight = { ...this.scrollHeight, [this.index]: 0 };
    this.content = this.collapsecontent?.nativeElement.innerHTML;
  }

  ngAfterContentChecked(): void {
    const componentContent = this.collapsecontent?.nativeElement.innerHTML;
    const element = this.collapse?.nativeElement;
    const childElement = this.collapsecontent?.nativeElement;

    if (componentContent !== this.content && this.isOpned) {
      const sumScroll = this.scrollHeight[this.index] + (element?.scrollHeight + childElement?.scrollHeight + 150);
      element.style.maxHeight = `${sumScroll}px`;
    }
  }

  toggleElement(): void {
    const element = this.collapse?.nativeElement;
    const childElement = this.collapsecontent?.nativeElement;
    const sumScroll = element.scrollHeight + childElement.scrollHeight + 150;

    if (!this.isOpned) {
      this.isOpned = true;
      this.scrollHeight = { ...this.scrollHeight, [this.index]: sumScroll };
      element.style.maxHeight = `${sumScroll}px`;
      this.whenOpen.emit();
    } else if (this.isOpned) {
      this.isOpned = false;
      this.scrollHeight = { ...this.scrollHeight, [this.index]: 0 };
      element.style.maxHeight = '0px';
    }
  }

  ngOnDestroy(): void { }

}
