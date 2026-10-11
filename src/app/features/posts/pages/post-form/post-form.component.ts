import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/service/auth.service';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../service/post.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-post-form',
  imports: [ReactiveFormsModule],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.css',
})
export class PostFormComponent implements OnInit {
  private readonly auth = inject(AuthService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);
  private readonly postService = inject(PostService);

  groupId = signal<string>('');
  userId = computed(() => this.auth.userData()?.id ?? null);

  createPost: FormGroup = this.fb.group({
    content: [null, [Validators.required]],
  });

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((p) => this.groupId.set(p.get('groupId') ?? ''));
  }

  sendData() {
    if (this.createPost.invalid) {
      this.createPost.markAllAsTouched();
      return;
    }

    const payload = {
      ...this.createPost.value,
      group_id: this.groupId(),
      author_id: this.userId(),
    };
    this.postService.createPost(payload).subscribe({
      next: (resp) => {
        console.log(resp, 'success');
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });

    console.log(payload, 'data');
  }
}
