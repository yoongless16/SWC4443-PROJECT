import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-addcustomer',
  templateUrl: './addcustomer.component.html',
  styleUrls: ['./addcustomer.component.css']
})
export class AddcustomerComponent implements OnInit {
  successMessage!: string; // 1. Add ! for definite assignment assertion

  constructor(private ApiserviceService: ApiserviceService) { }

  errorMessage: string = ''; // Initialize errorMessage

  customerForm = new FormGroup({ // 2. Import FormGroup and correct usage
    'custName': new FormControl('', Validators.required),
    'custEmail': new FormControl('', Validators.required),
    'custPhone': new FormControl('', Validators.required)
    
  });
  ngOnInit(): void {
  }
  addcustomer(): void{
    if (this.customerForm.valid) {
      console.log(this.customerForm.value);
      this.ApiserviceService.addcustomer(this.customerForm.value).subscribe( // 3. Ensure addcustomer returns Observable<any>
        (response: any) => { // 4. Explicitly define types for response and error
          console.log(response);
          this.customerForm.reset();
          this.successMessage = 'customer added successfully';
        },
        (error: any) => { // 4. Explicitly define types for response and error
          console.error(error);
          this.errorMessage = 'Failed to add customer';
        }
      );
    } else {
      this.errorMessage = 'Please fill out all fields';
    }
  }
  }


