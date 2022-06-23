import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'
import { ErrorHandlerService } from './shared/services/error-handler.service'
import { JwtModule } from "@auth0/angular-jwt";
import { AuthGuard } from './shared/guards/auth.guard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { ShowUserComponent } from './user/show-user/show-user.component';
import { AddEditUserComponent } from './user/add-edit-user/add-edit-user.component';
import { UserService } from './user.service';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AdminGuard } from './shared/guards/admin.guard';
import { ShowPedidosComponent } from './pedidos/show-pedidos/show-pedidos.component';
import { AddEditPedidosComponent } from './pedidos/add-edit-pedidos/add-edit-pedidos.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { ShowClientesComponent } from './clientes/show-clientes/show-clientes.component';
import { AddEditClientesComponent } from './clientes/add-edit-clientes/add-edit-clientes.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ShowPedidosVComponent } from './pedidos-v/show-pedidos-v/show-pedidos-v.component';
import { AddEditPedidosVComponent } from './pedidos-v/add-edit-pedidos-v/add-edit-pedidos-v.component';
import { PedidosVComponent } from './pedidos-v/pedidos-v.component';

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ShowUserComponent,
    AddEditUserComponent,
    MenuComponent,
    HomeComponent,
    ForbiddenComponent,
    ShowPedidosComponent,
    AddEditPedidosComponent,
    PedidosComponent,
    ShowClientesComponent,
    AddEditClientesComponent,
    ClientesComponent,
    ShowPedidosVComponent,
    AddEditPedidosVComponent,
    PedidosVComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'Home', component: HomeComponent },
      { path: 'forbidden', component: ForbiddenComponent }
    ]),
    RouterModule.forChild([
      { path: 'crearUsuario', component: UserComponent, canActivate: [AuthGuard, AdminGuard] },
      { path: 'clientes', component: ClientesComponent, canActivate: [AuthGuard, AdminGuard] },
      { path: 'pedidosAdmin', component: PedidosComponent, canActivate: [AuthGuard, AdminGuard] },
      { path: 'pedidosVendedor', component: PedidosVComponent, canActivate: [AuthGuard] }
    ]),
    RouterModule.forRoot([
      { path: 'authentication', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) }
    ]),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:7071"],
        disallowedRoutes:[]
      }
    })
  ],
  providers: [UserService, {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorHandlerService,
    multi: true
  }],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
