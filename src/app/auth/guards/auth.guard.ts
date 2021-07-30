import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

  constructor( private authService: AuthService,
                private router: Router ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      return this.authService.verificarAutenticacion()
                .pipe(
                  tap( estaAutenticado => {
                    if ( !estaAutenticado ) {
                      this.router.navigate(['./auth/login']);
                    }
                  })
                )
      // if ( this.authService.auth.id ) {
      //   return true;
      // }
      // console.log('bloqueado authgard canactivate');
      
      // return false;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean{

      return this.authService.verificarAutenticacion()
              .pipe(
                tap( estaAutenticado => {
                  if ( !estaAutenticado ) {
                    this.router.navigate(['./auth/login']);
                  }
                })
              )
      // if ( this.authService.auth.id ) {
      //   return true;
      // }
      // console.log('bloqueado authgard canload');
      
      // return false;
  }
}
