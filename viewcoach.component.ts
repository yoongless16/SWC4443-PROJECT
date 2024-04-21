import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service'; 
import { Router } from '@angular/router';


@Component({
  selector: 'app-viewcoach',
  templateUrl: './viewcoach.component.html',
  styleUrls: ['./viewcoach.component.css']
})
export class ViewcoachComponent implements OnInit {

  coach: any[] = []; // Initialize coachs as an empty array
  constructor(private ApiserviceService: ApiserviceService, private router: Router) { }

  ngOnInit(): void {
    this.fetchcoach(); 
  }

  fetchcoach() {
    this.ApiserviceService.getCoach().subscribe(data => {
      console.log('Received data:', data);
      this.coach = data;
    });
      
    }

    deletecoach(coachId: number) {
      this.ApiserviceService.deletecoach(coachId).subscribe(() => {
        console.log('coach deleted successfully');
        // After deletion, fetch homestays again to update the list
        this.fetchcoach();
      }, error => {
        console.error('Error deleting coach:', error);
        // Handle error
      });

  }


  updatecoach(Id: number): void {
    // Navigate to the update page with the homestay ID as a parameter
    this.router.navigate(['/updatecoach', Id]);
  }



}
