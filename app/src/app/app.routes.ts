import { Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { FoodTypeComponent } from './food-type/food-type.component';
import { FoodSizeComponent } from './food-size/food-size.component';
import { TasteComponent } from './taste/taste.component';
import { FoodComponent } from './food/food.component';
import { SaleComponent } from './sale/sale.component';
import { OrganizationComponent } from './organization/organization.component';
import { BillSaleComponent } from './bill-sale/bill-sale.component';
import { ReportSumPerDayComponent } from './report-sum-per-day/report-sum-per-day.component';
import { ReportSumPerMonthComponent } from './report-sum-per-month/report-sum-per-month.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';



export const routes: Routes = [
    {
        path: '',
        component: SignInComponent,
    },
    {
        path: 'foodType',
        component: FoodTypeComponent,
    },
    {
        path: 'foodSize',
        component: FoodSizeComponent,
    },
    {
        path: 'taste',
        component: TasteComponent,
    },{
        path: 'food',
        component: FoodComponent,
    },{
        path: 'sale',
        component: SaleComponent,
    },{
        path: 'organization',
        component: OrganizationComponent,
    },{
        path: 'bill-sale',
        component: BillSaleComponent,
    },{
        path: 'report-sum-per-day',
        component : ReportSumPerDayComponent
    },{
        path: 'report-sum-per-month',
        component : ReportSumPerMonthComponent
    } ,{
        path: 'dashboard',
        component : DashboardComponent
    },{
        path: 'user',
        component : UserComponent
    }
];
