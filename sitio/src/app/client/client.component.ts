import axios from 'axios';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { NgFor, DatePipe, formatDate, NgIf } from '@angular/common';
import { ModalCreateComponent } from '../modal-create/modal-create.component';
import { FormsModule } from '@angular/forms';

interface Client {
    businessId: string
    sharedKey: string
    name: string
    email: string
    phoneNumber: string
    createdAt: number
}

@Component({
    selector: 'app-client',
    templateUrl: './client.component.html',
    styleUrls: ['./client.component.scss'],
    imports: [NgFor, DatePipe, NgIf, ModalCreateComponent, FormsModule],
    standalone: true,
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class ClientComponent implements OnInit {
    items: Client[] = []
    showModal = false
    search = ""
    client: any = {}

    constructor() {
    }

    ngOnInit() {
        this.getData()
    }

    async getData() {
        try {
            const response = await axios('http://localhost:8080/clients', { params: { search: this.search || "" } })

            this.items = response.data.data || []
        } catch (error) {
            console.log("[Error get data]: ", error)
        }
    }

    setDate(data: number) {
        return formatDate(data, 'MMM d, y, HH:mm:ss', 'en-US')
    }

    openModal() {
        this.showModal = true;
    }

    closeModal() {
        this.client = {}
        this.showModal = false;
        this.getData()
    }

    setData(item: any) {
        this.client = item
        this.openModal()
    }
}
