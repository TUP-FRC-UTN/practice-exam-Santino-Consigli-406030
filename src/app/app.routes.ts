import { Routes } from '@angular/router';
import { FormCreateOrderComponent } from './form-create-order/form-create-order.component';
import { ListOrdersComponent } from './list-orders/list-orders.component';

export const routes: Routes = [
    {
        path:'', component:FormCreateOrderComponent
    },
    {
        path:'create-order', component: FormCreateOrderComponent
    },
    {
        path:'orders', component:ListOrdersComponent
    }
];
