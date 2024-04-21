import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service'; 

@Component({
  selector: 'app-update',
  templateUrl: './updatecoach.component.html',
  styleUrls: ['./updatecoach.component.css']
})
export class UpdatecoachComponent implements OnInit {
  coachForm: FormGroup = new FormGroup({
    coachName: new FormControl('', Validators.required),
    coachPhone: new FormControl('', [Validators.required])
  });

  constructor(
    private ApiserviceService: ApiserviceService, // Renamed service instance
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getcoachDetails();
  }

  getcoachDetails(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); // Ensure 'id' is the correct param as per your routing setup
    this.ApiserviceService.getcoach(id).subscribe(
      (coach: any) => {
        this.coachForm.patchValue({
          coachName: coach.coachName,
          coachPhone: coach.coachPhone
        });
      },
      (error) => {
        console.error('Failed to load coach details:', error);
      }
    );
  }

  updatecoach(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); // Corrected to use 'id'
    const coachData = this.coachForm.value;
    this.ApiserviceService.updatecoach(id, coachData).subscribe(
      () => {
        console.log('coach updated successfully');
        this.router.navigate(['/viewcoach']);
      },
      (error) => {
        console.error('Failed to update coach:', error);
      }
    );
  }
}
