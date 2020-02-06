import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@app/_models';
import { UserService, AuthenticationService, MapService } from '@app/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    loading = false;
    currentUser: User;

    constructor(public map: MapService, 
        private userService: UserService, 
        private authenticationService: AuthenticationService) { 
        this.authenticationService.currentUser.subscribe(x => {
        this.currentUser = x;
            
        });
    }

    ngOnInit() {}
}