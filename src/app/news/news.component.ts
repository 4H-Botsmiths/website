import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ColorSchemeService } from '../color-scheme.service';
import news from './news.json';



@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit, OnDestroy {

  public news: Post[] = news;
  public selectedNews: Post[] = [];
  public categories: string[] = [];
  public selectedCategories: string[] = [];

  private interval?: NodeJS.Timeout;

  constructor(public colorScheme: ColorSchemeService, private router: Router) { }

  /**
   * Setup categories and load posts
   */
  ngOnInit(): void {
    this.categories = ["FRC", "FTC", "FLL", "FLL Challenge", "FLL Explore", "Minecraft", "Evergreen State Fair"].filter(category => news.find(post => post.categories.includes(category)));
    news.forEach(post => post.categories.forEach(category => this.categories.includes(category) ? undefined : this.categories.push(category)));
    this.interval = setInterval(() => {
      if (this.selectedCategories.length) {
        this.selectedNews = [];
        this.news.forEach(post => {
          this.selectedCategories.every(category => post.categories?.includes(category)) ? this.selectedNews.push(post) : undefined;
        });
      } else {
        this.selectedNews = this.news;
      }
    });
  }
  /**
   * Stop category filtering
   */
  ngOnDestroy() {
    clearInterval(this.interval);
  }
  /**
   * toggles a selected filter
   * @param category the category to toggle
   */
  toggleFilter(category: string): void {
    this.selectedCategories.includes(category) ? this.selectedCategories.splice(this.selectedCategories.indexOf(category), 1) : this.selectedCategories.push(category);
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
  footer?: string;
}
interface link {
  name: string,
  href: string;
}
interface button {
  name: string,
  href: string;
}
