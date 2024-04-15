import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-modal-create',
  standalone: true,
  templateUrl: './modal-create.component.html',
  styleUrl: './modal-create.component.css',
  imports: [ReactiveFormsModule, NgIf]
})

export class ModalCreateComponent implements OnInit {
  @Output() eventClose = new EventEmitter<any>();
  @Input() propsClient: any = {}
  modify = false

  client = new FormGroup({
    businessId: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required])
  });

  ngOnInit() {
    let businessId = this.propsClient?.businessId || ""
    let name = this.propsClient?.name || ""
    let email = this.propsClient?.email || ""
    let phoneNumber = this.propsClient?.phoneNumber || ""

    this.client.controls.businessId.setValue(businessId)
    this.client.controls.name.setValue(name)
    this.client.controls.email.setValue(email)
    this.client.controls.phoneNumber.setValue(phoneNumber)

    if (businessId) {
      this.modify = true;
      this.client.controls.businessId.disable()
    }
  }

  closeModal() {
    this.eventClose.emit()
  }

  async validateForm() {
    try {
      if (this.client.status == "VALID") {
        const businessId = this.client.get('businessId')?.value || ""
        const name = this.client.get('name')?.value || ""
        const email = this.client.get('email')?.value || ""
        const phoneNumber = this.client.get('phoneNumber')?.value || ""

        await axios.post("http://localhost:8080/clients", {
          businessId,
          name,
          email,
          phoneNumber
        })

        this.closeModal()
      }
    } catch (error: any) {
      let message = error?.response?.data?.message || "Error creando cliente"
      console.log("[Error create client]: ", message)
      alert(message)
    }
  }
}
