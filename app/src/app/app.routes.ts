import { Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { FoodTypeComponent } from './food-type/food-type.component';

export const routes: Routes = [
    {
        path: '',
        component: SignInComponent,
    },
    {
        path: 'foodType',
        component: FoodTypeComponent,
    }
];
