import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service'; 

@Component({
  selector: 'app-update',
  templateUrl: './updatecustomer.component.html',
  styleUrls: ['./updatecustomer.component.css']
})
export class UpdatecustomerComponent implements OnInit {
  customerForm: FormGroup = new FormGroup({
    custName: new FormControl('', Validators.required),
    custEmail: new FormControl('', [Validators.required, Validators.email]),
    custPhone: new FormControl('', [Validators.required])
  });

  constructor(
    private ApiserviceService: ApiserviceService, // Renamed service instance
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCustomerDetails();
  }

  getCustomerDetails(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); // Ensure 'id' is the correct param as per your routing setup
    this.ApiserviceService.getcustomer(id).subscribe(
      (customer: any) => {
        this.customerForm.patchValue({
          custName: customer.custName,
          custEmail: customer.custEmail,
          custPhone: customer.custPhone
        });
      },
      (error) => {
        console.error('Failed to load customer details:', error);
      }
    );
  }

  updateCustomer(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); // Corrected to use 'id'
    const customerData = this.customerForm.value;
    this.ApiserviceService.updatecustomer(id, customerData).subscribe(
      () => {
        console.log('Customer updated successfully');
        this.router.navigate(['/viewcustomer']);
      },
      (error) => {
        console.error('Failed to update customer:', error);
      }
    );
  }
}
