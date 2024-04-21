import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service'; 
import { Router } from '@angular/router';


@Component({
  selector: 'app-viewcustomer',
  templateUrl: './viewcustomer.component.html',
  styleUrls: ['./viewcustomer.component.css']
})
export class ViewcustomerComponent implements OnInit {

  customer: any[] = []; // Initialize customers as an empty array
  constructor(private ApiserviceService: ApiserviceService, private router: Router) { }

  ngOnInit(): void {
    this.fetchcustomer(); 
  }

  fetchcustomer() {
    this.ApiserviceService.getCustomer().subscribe(data => {
      console.log('Received data:', data);
      this.customer = data;
    });
      
    }

    deletecustomer(custId: number) {
      this.ApiserviceService.deletecustomer(custId).subscribe(() => {
        console.log('customer deleted successfully');
        // After deletion, fetch homestays again to update the list
        this.fetchcustomer();
      }, error => {
        console.error('Error deleting customer:', error);
        // Handle error
      });

  }


  updatecustomer(custId: number): void {
    // Navigate to the update page with the homestay ID as a parameter
    this.router.navigate(['/updatecustomer', custId]);
  }



}
