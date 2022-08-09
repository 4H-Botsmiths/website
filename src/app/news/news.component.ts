import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

import { ColorSchemeService } from '../color-scheme.service';
import news from './news.json';



@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  public news: Post[] = news;
  public selectedNews: Post[] = [];
  public categories: string[] = [];
  public selectedCategories: string[] = [];

  constructor(public colorScheme: ColorSchemeService, private router: Router) { }

  ngOnInit(): void {
    this.categories = ["FRC", "FTC", "FLL", "FLL Challenge", "FLL Explore", "Minecraft", "Evergreen State Fair"].filter(category => news.find(post => post.categories.includes(category)))
    news.forEach(post => post.categories.forEach(category => this.categories.includes(category) ? undefined : this.categories.push(category)));
    const interval = setInterval(() => {
      if (this.selectedCategories.length) {
        this.selectedNews = [];
        this.news.forEach(post => {
          this.selectedCategories.every(category => post.categories?.includes(category)) ? this.selectedNews.push(post) : undefined;
        })
      } else {
        this.selectedNews = this.news;
      }
    });
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        clearInterval(interval);
        // Show progress spinner or progress bar
      }
    });
  }
  toggleFilter(category: string): void {
    this.selectedCategories.includes(category) ? this.selectedCategories.splice(this.selectedCategories.indexOf(category), 1) : this.selectedCategories.push(category)
  }
}
export interface Post {
  header?: string,
  image?: string,
  title: string,
  /**"FRC" | "FTC" | "FLL" | "FLL Challenge" | "FLL Explore" | "Minecraft" | "Evergreen State Fair"*/
  categories?: string[],
  description?: string,
  links?: link[],
  buttons?: button[],
  footer?: string
}
interface link {
  name: string,
  href: string
}
interface button {
  name: string,
  href: string
}