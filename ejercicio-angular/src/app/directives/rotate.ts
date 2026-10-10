import {
  Directive,
  ElementRef,
  HostListener,
  effect,
  inject,
  input,
  numberAttribute,
} from '@angular/core';

@Directive({
  selector: 'img[rotate]',
})
export class Rotate {
  private element = inject(ElementRef<HTMLElement>);

  rotate = input(0, { transform: numberAttribute });
  step = input(10, { transform: numberAttribute });

  private rotation = 0;

  constructor() {
    effect(() => {
      this.rotation = this.rotate();
      this.applyRotation();
    });
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    if (event.shiftKey) {
      this.rotation -= this.step();
    } else {
      this.rotation += this.step();
    }

    this.applyRotation();
  }

  private applyRotation(): void {
    this.element.nativeElement.style.transform = `rotate(${this.rotation}deg)`;
  }
}
