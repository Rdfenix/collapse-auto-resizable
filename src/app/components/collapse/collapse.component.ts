import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren, Output, EventEmitter, ViewChild, AfterContentInit, AfterContentChecked, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';

@Component({
  selector: 'app-collapse',
  templateUrl: './collapse.component.html',
  styleUrls: ['./collapse.component.scss']
})
export class CollapseComponent implements OnInit, OnDestroy, AfterContentInit, AfterContentChecked {

  @Input() childClosed!: any;

  @Output() whenOpen = new EventEmitter()

  @ViewChild('collapseSection') collapse!: ElementRef;
  @ViewChild("collapsecontent") collapsecontent!: ElementRef;

  isOpned = false;
  content = null;
  private scrollHeight = 0;

  constructor() { }

  ngOnInit(): void { }

  ngAfterContentInit(): void {
    this.content = this.collapsecontent?.nativeElement.innerHTML;
    this.scrollHeight = 0;
  }

  ngAfterContentChecked(): void {
    const componentContent = this.collapsecontent?.nativeElement.innerHTML;
    const element = this.collapse?.nativeElement;
    const childElement = this.collapsecontent?.nativeElement;

    if (componentContent !== this.content && this.isOpned) {
      this.scrollHeight = this.scrollHeight - (element?.scrollHeight - childElement?.scrollHeight);
      const sumScroll = this.scrollHeight + (element?.scrollHeight + childElement?.scrollHeight + 50);
      this.scrollHeight = sumScroll;
      element.style.maxHeight = `${this.scrollHeight}px`;
    }
  }

  toggleElement(): void {
    const element = this.collapse?.nativeElement;
    const childElement = this.collapsecontent?.nativeElement;
    this.scrollHeight = 0;
    const sumScroll = element.scrollHeight + childElement.scrollHeight + 10;

    if (!this.isOpned) {
      this.isOpned = true;
      this.scrollHeight = sumScroll;
      element.style.maxHeight = `${sumScroll}px`;
      this.whenOpen.emit();
    } else if (this.isOpned) {
      this.isOpned = false;
      element.style.maxHeight = '0px';
      this.scrollHeight = this.scrollHeight - sumScroll;
    }
  }

  ngOnDestroy(): void {
  }

}
