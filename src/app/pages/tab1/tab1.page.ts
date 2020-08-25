import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { Post } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  posts: Post[] = [];
  habilitado = true;

  constructor( private postsService: PostsService) {}

  ngOnInit() {
    this.siguientes();
    this.postsService.nuevoPost
    .subscribe(post => {
      this.posts.unshift(post);
    });
  }

  recargar(event) {
    this.siguientes(event, true);
  }

  siguientes( event?, pull:boolean = false ) {
    if (pull) {
      this.habilitado = true;
      this.posts = [];
    }
    this.postsService.getPosts(pull)
    .subscribe( resp => {
      console.log('Resp', resp);
      this.posts.push(...resp.posts);
      if (event) {
        event.target.complete();
        if (resp.posts.length === 0) {
          this.habilitado = false;
        }
      }
    })
  }


}
