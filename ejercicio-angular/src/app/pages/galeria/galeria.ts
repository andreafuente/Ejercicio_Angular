import { Component, ChangeDetectorRef, DestroyRef, inject } from '@angular/core';
import { Rotate } from '../../directives/rotate';
import { GalleryImage } from '../../model/gallery-image';
import { galleryImages } from '../../data/gallery-images'; 


@Component({
  imports: [Rotate],
  selector: 'app-galeria',
  styleUrl: './galeria.css',
  templateUrl: './galeria.html',
})
export class Galeria {
  private cdr = inject(ChangeDetectorRef);


  imageWidth = 400;
  imageHeight = 200;

images: GalleryImage[] = galleryImages;


  selectedImage: GalleryImage = this.images[0];

  isPlaying: boolean = false;
  intervalId: ReturnType<typeof setInterval> | null = null;

  currentPage: number = 0;
  imagesPerPage: number = 3;

  private destroyRef = inject(DestroyRef);

  play(): void {
    this.isPlaying = true;

    this.intervalId = setInterval(() => {
      const currentIndex = this.images.indexOf(this.selectedImage);
      const nextIndex = (currentIndex + 1) % this.images.length;
      this.selectedImage = this.images[nextIndex];
      this.cdr.detectChanges();
    }, 2000);
  }
  stop(): void {
    this.isPlaying = false;
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
  selectImage(image: GalleryImage): void {
    this.selectedImage = image;
  }

  nextImage(): void {
    const currentIndex = this.images.indexOf(this.selectedImage);
    this.selectedImage = this.images[(currentIndex + 1) % this.images.length];
  }

  previousImage(): void {
    const currentIndex = this.images.indexOf(this.selectedImage);
    this.selectedImage = this.images[(currentIndex - 1 + this.images.length) % this.images.length];
  }

  increaseImage(): void {
    this.imageWidth += 50;
    this.imageHeight += 50;
  }

  decreaseImage(): void {
    this.imageWidth -= 50;
    this.imageHeight -= 50;
  }

  get paginatedImages(): GalleryImage[] {
    const startIndex = this.currentPage * this.imagesPerPage;
    return this.images.slice(startIndex, startIndex + this.imagesPerPage);
  }

  nextPage(): void {
    if ((this.currentPage + 1) * this.imagesPerPage < this.images.length) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  get totalPages(): number {
    return Math.ceil(this.images.length / this.imagesPerPage);
  }
}
