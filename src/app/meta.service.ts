import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';



@Injectable({
  providedIn: 'root'
})
export class MetaService {

  constructor(private meta: Meta, private title: Title) { }
  /**@deprecated Use `updateDescription()` and `updateKeywords()` instead*/
  updateMetaTags(tags: { description?: string, keywords?: string[]; }) {
    this.meta.updateTag({ name: 'description', content: tags.description ?? '' }, 'name=\'description\'');
    const keywords = ['4-H', '4H', 'Botsmiths', 'Robotics', 'Snohomish', 'FIRST'];
    tags.keywords ? keywords.push(...tags.keywords) : undefined;
    this.meta.updateTag({
      name: 'keywords', content: keywords.join(', ')
    }, 'name=\'keywords\'');
  }

  updateDescription(description: string) {
    this.meta.updateTag({ name: 'description', content: description ?? '' }, 'name=\'description\'');
    this.meta.updateTag({ name: 'og:description', content: description ?? '' }, 'name=\'og:description\'');
  }

  updateKeywords(keywords: string[]) {
    const tagKeywords = ['4-H', '4H', 'Botsmiths', 'Robotics', 'Snohomish', 'FIRST'];
    tagKeywords.push(...keywords);
    this.meta.updateTag({
      name: 'keywords', content: tagKeywords.join(', ')
    }, 'name=\'keywords\'');
  }

  updateTitle(title: string) {
    this.title.setTitle(title + ' · 4-H Botsmiths');
    this.meta.updateTag({ name: 'og:title', content: title ?? '' }, 'name=\'og:title\'');
  }
}
