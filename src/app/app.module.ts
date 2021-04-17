import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { MyBookingComponent } from './my-booking/my-booking.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { MyWalletComponent } from './my-wallet/my-wallet.component';
import {AboutComponent} from './about/about.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { PaymentComponent } from "./payment/payment.component";
import { TicketComponent } from "./ticket/ticket.component";
import { FormsModule } from '@angular/forms';
import { NgxPrintModule } from 'ngx-print';
import { SeatBookingComponent } from './seat-booking/seat-booking.component';
import { CancelRescheduleTicketComponent } from './cancel-reschedule-ticket/cancel-reschedule-ticket.component';
import { AdminComponentComponent } from './admin-component/admin-component.component';
import { SearchedBusListComponent } from './searched-bus-list/searched-bus-list.component';
import {RegisterationComponent} from './registeration/registeration.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {LoginComponent} from './login/login.component';
import { TrackTicketComponent } from './track-ticket/track-ticket.component';
import { PassengerDetailsComponent } from './passenger-details/passenger-details.component';
import { BookedTicketComponent } from './booked-ticket/booked-ticket.component';
import { NewHomeComponent } from './new-home/new-home.component';
import { ContactUsComponent } from './contact-us/contact-us.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    UserDashboardComponent,
    MyBookingComponent,
    MyProfileComponent,
    MyWalletComponent,
    AboutComponent,
    FeedbackComponent,
    PaymentComponent,
    TicketComponent,
    SeatBookingComponent,
    CancelRescheduleTicketComponent,
    AdminComponentComponent,
    SearchedBusListComponent,
    RegisterationComponent,
    ForgotPasswordComponent,
    LoginComponent,
    TrackTicketComponent,
    PassengerDetailsComponent,
    BookedTicketComponent,
    NewHomeComponent,
    ContactUsComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxPrintModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
