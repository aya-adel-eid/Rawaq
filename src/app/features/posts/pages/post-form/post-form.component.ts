import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../auth/service/auth.service';
import { PostService } from '../../service/post.service';

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

  isSubmitting = signal(false);
  groupId = signal<string>('');
  userId = computed(() => this.auth.userData()?.id ?? null);

  createPost: FormGroup = this.fb.group({
    content: [null, [Validators.required]],
  });

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((p) => this.groupId.set(p.get('groupId') ?? ''));
  }

  closeForm() {
    this.postService.closeFormCreate();
  }

  sendData() {
    if (this.createPost.invalid || this.isSubmitting()) {
      this.createPost.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);

    const payload = {
      ...this.createPost.value,
      group_id: this.groupId(),
      author_id: this.userId(),
    };

    this.postService.createPost(payload).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.createPost.reset();
        this.closeForm();
        this.postService.openSuccess();
        this.postService.getLatestPosts(this.groupId());
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
        this.isSubmitting.set(false);
      },
    });
  }
}
