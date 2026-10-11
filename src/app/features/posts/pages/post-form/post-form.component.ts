import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-form',
  imports: [],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.css',
})
export class PostFormComponent {
  private readonly fb = inject(FormBuilder);
  createPost: FormGroup = this.fb.group({
    group_id: [null, [Validators.required]],
    author_id: [null, [Validators.required]],
    content: [null, [Validators.required]],
  });
}
