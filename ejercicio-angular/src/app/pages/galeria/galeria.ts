import { Component, ChangeDetectorRef, inject } from '@angular/core';

interface GalleryImage {
  id: number;
  src: string;
  title: string;
}
@Component({
  imports: [],
  selector: 'app-galeria',
  styleUrl: './galeria.css',
  templateUrl: './galeria.html',
})
export class Galeria {
  private cdr = inject(ChangeDetectorRef);
  images: GalleryImage[] = [
    { id: 1, src: 'cerdo.jpeg', title: 'Cerdo' },
    { id: 2, src: 'hipopotamo.webp', title: 'Hipopótamo' },
    { id: 3, src: 'leona.webp', title: 'Leona' },
    { id: 4, src: 'tigre.webp', title: 'Tigre' },
    { id: 5, src: 'mapaches.webp', title: 'Mapaches' },
    { id: 6, src: 'suricato.webp', title: 'Suricato' },
    { id: 7, src: 'zorro.webp', title: 'Zorro' },
    { id: 8, src: 'loro.jpg', title: 'Loros' },
  ];

  imageWidth: number = 400;
  imageHeight: number = 200;

  selectedImage: GalleryImage = this.images[0];

  isPlaying: boolean = false;
  intervalId: ReturnType<typeof setInterval> | null = null;

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
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
  selectImage(image: GalleryImage): void {
    this.selectedImage = image;
  }

  nextImage(): void {
    const currentIndex = this.images.indexOf(this.selectedImage);
    this.selectedImage = this.images[currentIndex + 1];
  }

  previousImage(): void {
    const currentIndex = this.images.indexOf(this.selectedImage);
    this.selectedImage = this.images[currentIndex - 1];
  }

  increaseImage(): void {
    this.imageWidth += 50;
    this.imageHeight += 50;
  }

  decreaseImage(): void {
    this.imageWidth -= 50;
    this.imageHeight -= 50;
  }

currentPage: number = 0;
imagesPerPage: number = 3;

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