import { ColorSchemeService } from 'src/app/color-scheme.service';
import { MetaService } from 'src/app/meta.service';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Post } from '../news.component';
import news from '../news.json';



@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  public post!: Post;

  constructor(private activatedRoute: ActivatedRoute, public colorScheme: ColorSchemeService, private metaService: MetaService) {
  }

  ngOnInit(): void {
    this.post = news.find(post => post.title?.split(' ').join('-') === this.activatedRoute.snapshot.paramMap.get("post")) ?? { "title": "Post Not Found" };
    if (this.post.title !== 'Post Not Found') {
      this.metaService.updateKeywords(['News', 'Post', 'Blog', ...(this.post.categories ?? [])]);
      this.metaService.updateTitle(this.post.title);
      this.post.description !== undefined ? this.metaService.updateDescription(this.post.description) : undefined;
    }
  }
}
