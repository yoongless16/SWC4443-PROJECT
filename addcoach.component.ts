import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-addcoach',
  templateUrl: './addcoach.component.html',
  styleUrls: ['./addcoach.component.css']
})
export class AddcoachComponent implements OnInit {
  successMessage!: string; // 1. Add ! for definite assignment assertion

  constructor(private ApiserviceService: ApiserviceService) { }

  errorMessage: string = ''; // Initialize errorMessage

  coachForm = new FormGroup({ // 2. Import FormGroup and correct usage
    'coachName': new FormControl('', Validators.required),
    'coachPhone': new FormControl('', Validators.required)
    
  });
  ngOnInit(): void {
  }
  addcoach(): void{
    if (this.coachForm.valid) {
      console.log(this.coachForm.value);
      this.ApiserviceService.addcoach(this.coachForm.value).subscribe( // 3. Ensure addcoach returns Observable<any>
        (response: any) => { // 4. Explicitly define types for response and error
          console.log(response);
          this.coachForm.reset();
          this.successMessage = 'coach added successfully';
        },
        (error: any) => { // 4. Explicitly define types for response and error
          console.error(error);
          this.errorMessage = 'Failed to add coach';
        }
      );
    } else {
      this.errorMessage = 'Please fill out all fields';
    }
  }
  }


